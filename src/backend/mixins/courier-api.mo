import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import AuthTypes "../types/auth";
import OrderTypes "../types/orders";
import CommonTypes "../types/common";
import CourierTypes "../types/courier";
import AuthLib "../lib/auth";
import CourierLib "../lib/courier";

mixin (
  couriers : List.List<CourierTypes.Courier>,
  courierSessions : Map.Map<Text, Nat>,
  orders : List.List<OrderTypes.Order>,
  users : List.List<AuthTypes.User>,
  sessions : Map.Map<Text, AuthTypes.Session>,
  courierLocations : Map.Map<Nat, CommonTypes.CourierLocation>,
  nextCourierIdCounter : List.List<Nat>,
) {

  // Resolve courier from session token
  func getCourierFromToken(token : Text) : ?CourierTypes.Courier {
    switch (courierSessions.get(token)) {
      case null { null };
      case (?courierId) {
        couriers.find(func(c : CourierTypes.Courier) : Bool { c.id == courierId })
      };
    }
  };

  public shared func registerCourier(
    name : Text,
    phone : Text,
    email : Text,
    password : Text,
    vehicleType : Text,
  ) : async { #ok : CourierTypes.CourierPublic; #err : Text } {
    // Check if email already taken by any user
    let existingUser = users.find(func(u : AuthTypes.User) : Bool { u.email == email });
    switch (existingUser) {
      case (?_) { return #err("Email already registered") };
      case null {};
    };

    let now = Time.now();
    // Courier user IDs use a 2_000_000 offset to avoid collision with regular user IDs
    let courierId = nextCourierIdCounter.at(0);
    let userId = courierId + 2_000_000;

    // Create a user record for the courier
    let userRecord : AuthTypes.User = {
      id = userId;
      var email = email;
      var passwordHash = AuthLib.hashPassword(password);
      var name = name;
      var phone = phone;
      var isActive = true;
      createdAt = now;
    };
    users.add(userRecord);

    // Increment courier ID counter
    nextCourierIdCounter.put(0, courierId + 1);

    let courier = CourierLib.new(courierId, userId, name, phone, vehicleType, now);
    couriers.add(courier);
    #ok(courier.toPublic())
  };

  public shared func courierLogin(
    email : Text,
    password : Text,
  ) : async CourierTypes.CourierLoginResult {
    let pwHash = AuthLib.hashPassword(password);
    let userOpt = users.find(func(u : AuthTypes.User) : Bool {
      u.email == email and u.passwordHash == pwHash
    });
    switch (userOpt) {
      case null { #wrongCredentials };
      case (?user) {
        // Find the courier record linked to this user
        let courierOpt = couriers.find(func(c : CourierTypes.Courier) : Bool {
          c.userId == user.id
        });
        switch (courierOpt) {
          case null { #wrongCredentials };
          case (?courier) {
            if (not courier.isActive) {
              return #inactive
            };
            let now = Time.now();
            let token = CourierLib.generateCourierToken(courier.id, now);
            courierSessions.add(token, courier.id);
            #ok({ courier = courier.toPublic(); token })
          };
        }
      };
    }
  };

  public shared query func getCourierProfile(
    token : Text
  ) : async ?CourierTypes.CourierPublic {
    switch (getCourierFromToken(token)) {
      case null { null };
      case (?courier) { ?courier.toPublic() };
    }
  };

  public shared func updateCourierLocation(
    token : Text,
    orderId : Nat,
    lat : Float,
    lng : Float,
  ) : async { #ok; #err : Text } {
    switch (getCourierFromToken(token)) {
      case null { #err("Unauthorized: invalid courier session") };
      case (?courier) {
        let now = Time.now();
        switch (courierLocations.get(orderId)) {
          case (?loc) {
            // Update existing location in place
            loc.lat := lat;
            loc.lng := lng;
            loc.timestamp := now;
          };
          case null {
            // Create new location record
            let newLoc : CommonTypes.CourierLocation = {
              courierId = courier.id;
              orderId;
              var lat = lat;
              var lng = lng;
              var timestamp = now;
            };
            courierLocations.add(orderId, newLoc);
          };
        };
        #ok
      };
    }
  };

  public shared query func getCourierLocation(
    orderId : Nat
  ) : async ?{ courierId : Nat; orderId : Nat; lat : Float; lng : Float; timestamp : Int } {
    switch (courierLocations.get(orderId)) {
      case null { null };
      case (?loc) {
        ?{
          courierId = loc.courierId;
          orderId = loc.orderId;
          lat = loc.lat;
          lng = loc.lng;
          timestamp = loc.timestamp;
        }
      };
    }
  };

  public shared query func getPendingOrdersForCourier(
    token : Text
  ) : async [OrderTypes.OrderPublic] {
    switch (getCourierFromToken(token)) {
      case null { [] };
      case (?courier) {
        CourierLib.getPendingOrders(orders, courier.id)
      };
    }
  };

  public shared func acceptOrder(
    token : Text,
    orderId : Nat,
  ) : async CourierTypes.AssignOrderResult {
    switch (getCourierFromToken(token)) {
      case null { #unauthorized };
      case (?courier) {
        let orderOpt = orders.find(func(o : OrderTypes.Order) : Bool { o.id == orderId });
        switch (orderOpt) {
          case null { #notFound };
          case (?order) {
            if (order.courierId != null) {
              return #alreadyAssigned
            };
            switch (order.status) {
              case (#Pending) {};
              case _ { return #err("Order is not in pending state") };
            };
            let now = Time.now();
            order.courierId := ?courier.id;
            order.status := #Accepted;
            order.updatedAt := now;
            #ok({
              id = order.id;
              userId = order.userId;
              courierId = order.courierId;
              paymentId = order.paymentId;
              pickupAddress = order.pickupAddress;
              dropoffAddress = order.dropoffAddress;
              itemDescription = order.itemDescription;
              paymentMethod = order.paymentMethod;
              estimatedPrice = order.estimatedPrice;
              status = order.status;
              paymentStatus = order.paymentStatus;
              createdAt = order.createdAt;
              updatedAt = order.updatedAt;
            })
          };
        }
      };
    }
  };

  public shared func confirmPickup(
    token : Text,
    orderId : Nat,
    lat : Float,
    lng : Float,
  ) : async { #ok; #err : Text } {
    switch (getCourierFromToken(token)) {
      case null { #err("Unauthorized: invalid courier session") };
      case (?courier) {
        let orderOpt = orders.find(func(o : OrderTypes.Order) : Bool { o.id == orderId });
        switch (orderOpt) {
          case null { #err("Order not found") };
          case (?order) {
            if (order.courierId != ?courier.id) {
              return #err("This order is not assigned to you")
            };
            let now = Time.now();
            order.status := #PickedUp;
            order.updatedAt := now;
            // Record GPS location
            switch (courierLocations.get(orderId)) {
              case (?loc) {
                loc.lat := lat;
                loc.lng := lng;
                loc.timestamp := now;
              };
              case null {
                let newLoc : CommonTypes.CourierLocation = {
                  courierId = courier.id;
                  orderId;
                  var lat = lat;
                  var lng = lng;
                  var timestamp = now;
                };
                courierLocations.add(orderId, newLoc);
              };
            };
            #ok
          };
        }
      };
    }
  };

  public shared func confirmDelivery(
    token : Text,
    orderId : Nat,
    lat : Float,
    lng : Float,
  ) : async { #ok; #err : Text } {
    switch (getCourierFromToken(token)) {
      case null { #err("Unauthorized: invalid courier session") };
      case (?courier) {
        let orderOpt = orders.find(func(o : OrderTypes.Order) : Bool { o.id == orderId });
        switch (orderOpt) {
          case null { #err("Order not found") };
          case (?order) {
            if (order.courierId != ?courier.id) {
              return #err("This order is not assigned to you")
            };
            let now = Time.now();
            order.status := #Delivered;
            order.updatedAt := now;
            // Update final GPS location
            switch (courierLocations.get(orderId)) {
              case (?loc) {
                loc.lat := lat;
                loc.lng := lng;
                loc.timestamp := now;
              };
              case null {
                let newLoc : CommonTypes.CourierLocation = {
                  courierId = courier.id;
                  orderId;
                  var lat = lat;
                  var lng = lng;
                  var timestamp = now;
                };
                courierLocations.add(orderId, newLoc);
              };
            };
            // Increment total deliveries counter
            courier.totalDeliveries += 1;
            #ok
          };
        }
      };
    }
  };

  public shared query func getMyCourierOrders(
    token : Text
  ) : async [OrderTypes.OrderPublic] {
    switch (getCourierFromToken(token)) {
      case null { [] };
      case (?courier) {
        CourierLib.getCourierOrders(orders, courier.id)
      };
    }
  };

  public shared query func getCourierStats(
    token : Text
  ) : async CourierTypes.CourierStats {
    switch (getCourierFromToken(token)) {
      case null {
        { totalDeliveries = 0; completedThisMonth = 0; averageRating = 0.0; totalEarnings = 0.0; earningsThisMonth = 0.0 }
      };
      case (?courier) {
        let now = Time.now();
        CourierLib.computeStats(orders, courier.id, now)
      };
    }
  };
};
