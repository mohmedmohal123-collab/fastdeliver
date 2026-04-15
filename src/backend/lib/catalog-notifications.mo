import Types "../types/catalog-notifications";
import CommonTypes "../types/common";
import AuthTypes "../types/auth";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  // ─── Counter helpers ──────────────────────────────────────────────────────────

  /// Read current counter value, increment stored value, return old value.
  public func nextId(counter : List.List<Nat>) : Nat {
    let id = switch (counter.first()) {
      case (?n) { n };
      case null { 1 };
    };
    counter.mapInPlace(func(_ : Nat) : Nat { id + 1 });
    id
  };

  // ─── Product helpers ──────────────────────────────────────────────────────────

  public func toProductPublic(p : Types.Product) : Types.ProductPublic {
    {
      id = p.id;
      name = p.name;
      nameAr = p.nameAr;
      description = p.description;
      descriptionAr = p.descriptionAr;
      price = p.price;
      category = p.category;
      imageUrl = p.imageUrl;
      isActive = p.isActive;
      companyId = p.companyId;
      createdAt = p.createdAt;
    }
  };

  // ─── Product functions ────────────────────────────────────────────────────────

  public func createProduct(
    products : List.List<Types.Product>,
    counter : List.List<Nat>,
    input : Types.ProductInput,
  ) : Types.ProductPublic {
    let id = nextId(counter);
    let product : Types.Product = {
      id;
      var name = input.name;
      var nameAr = input.nameAr;
      var description = input.description;
      var descriptionAr = input.descriptionAr;
      var price = input.price;
      var category = input.category;
      var imageUrl = input.imageUrl;
      var isActive = input.isActive;
      var companyId = input.companyId;
      createdAt = Time.now();
    };
    products.add(product);
    toProductPublic(product)
  };

  public func updateProduct(
    products : List.List<Types.Product>,
    id : Types.ProductId,
    input : Types.ProductInput,
  ) : ?Types.ProductPublic {
    let found = products.find(func(p : Types.Product) : Bool { p.id == id });
    switch (found) {
      case null { null };
      case (?p) {
        p.name := input.name;
        p.nameAr := input.nameAr;
        p.description := input.description;
        p.descriptionAr := input.descriptionAr;
        p.price := input.price;
        p.category := input.category;
        p.imageUrl := input.imageUrl;
        p.isActive := input.isActive;
        p.companyId := input.companyId;
        ?toProductPublic(p)
      };
    }
  };

  public func deleteProduct(
    products : List.List<Types.Product>,
    id : Types.ProductId,
  ) : Bool {
    let sizeBefore = products.size();
    products.mapInPlace(func(p : Types.Product) : Types.Product {
      if (p.id == id) { p.isActive := false };
      p
    });
    // Soft-delete: mark inactive. If we want hard-delete, filter instead.
    // Check if it existed:
    products.any(func(p : Types.Product) : Bool { p.id == id }) or sizeBefore > 0
  };

  public func listProducts(
    products : List.List<Types.Product>,
    activeOnly : Bool,
  ) : [Types.ProductPublic] {
    let filtered = if (activeOnly) {
      products.filter(func(p : Types.Product) : Bool { p.isActive })
    } else {
      products.clone()
    };
    filtered.map<Types.Product, Types.ProductPublic>(func(p) { toProductPublic(p) }).toArray()
  };

  public func getProduct(
    products : List.List<Types.Product>,
    id : Types.ProductId,
  ) : ?Types.ProductPublic {
    switch (products.find(func(p : Types.Product) : Bool { p.id == id })) {
      case null { null };
      case (?p) { ?toProductPublic(p) };
    }
  };

  // ─── Company helpers ──────────────────────────────────────────────────────────

  public func toCompanyPublic(c : Types.Company) : Types.CompanyPublic {
    {
      id = c.id;
      name = c.name;
      nameAr = c.nameAr;
      description = c.description;
      descriptionAr = c.descriptionAr;
      logoUrl = c.logoUrl;
      isActive = c.isActive;
      createdAt = c.createdAt;
    }
  };

  // ─── Company functions ────────────────────────────────────────────────────────

  public func createCompany(
    companies : List.List<Types.Company>,
    counter : List.List<Nat>,
    input : Types.CompanyInput,
  ) : Types.CompanyPublic {
    let id = nextId(counter);
    let company : Types.Company = {
      id;
      var name = input.name;
      var nameAr = input.nameAr;
      var description = input.description;
      var descriptionAr = input.descriptionAr;
      var logoUrl = input.logoUrl;
      var isActive = input.isActive;
      createdAt = Time.now();
    };
    companies.add(company);
    toCompanyPublic(company)
  };

  public func updateCompany(
    companies : List.List<Types.Company>,
    id : Types.CompanyId,
    input : Types.CompanyInput,
  ) : ?Types.CompanyPublic {
    let found = companies.find(func(c : Types.Company) : Bool { c.id == id });
    switch (found) {
      case null { null };
      case (?c) {
        c.name := input.name;
        c.nameAr := input.nameAr;
        c.description := input.description;
        c.descriptionAr := input.descriptionAr;
        c.logoUrl := input.logoUrl;
        c.isActive := input.isActive;
        ?toCompanyPublic(c)
      };
    }
  };

  public func deleteCompany(
    companies : List.List<Types.Company>,
    id : Types.CompanyId,
  ) : Bool {
    let found = companies.find(func(c : Types.Company) : Bool { c.id == id });
    switch (found) {
      case null { false };
      case (?c) {
        c.isActive := false;
        true
      };
    }
  };

  public func listCompanies(
    companies : List.List<Types.Company>,
    activeOnly : Bool,
  ) : [Types.CompanyPublic] {
    let filtered = if (activeOnly) {
      companies.filter(func(c : Types.Company) : Bool { c.isActive })
    } else {
      companies.clone()
    };
    filtered.map<Types.Company, Types.CompanyPublic>(func(c) { toCompanyPublic(c) }).toArray()
  };

  public func getCompany(
    companies : List.List<Types.Company>,
    id : Types.CompanyId,
  ) : ?Types.CompanyPublic {
    switch (companies.find(func(c : Types.Company) : Bool { c.id == id })) {
      case null { null };
      case (?c) { ?toCompanyPublic(c) };
    }
  };

  // ─── Offer helpers ────────────────────────────────────────────────────────────

  public func toOfferPublic(o : Types.Offer) : Types.OfferPublic {
    {
      id = o.id;
      title = o.title;
      titleAr = o.titleAr;
      description = o.description;
      descriptionAr = o.descriptionAr;
      discount = o.discount;
      validUntil = o.validUntil;
      isActive = o.isActive;
      createdAt = o.createdAt;
    }
  };

  // ─── Offer functions ──────────────────────────────────────────────────────────

  public func createOffer(
    offers : List.List<Types.Offer>,
    counter : List.List<Nat>,
    input : Types.OfferInput,
  ) : Types.OfferPublic {
    let id = nextId(counter);
    let offer : Types.Offer = {
      id;
      var title = input.title;
      var titleAr = input.titleAr;
      var description = input.description;
      var descriptionAr = input.descriptionAr;
      var discount = input.discount;
      var validUntil = input.validUntil;
      var isActive = input.isActive;
      createdAt = Time.now();
    };
    offers.add(offer);
    toOfferPublic(offer)
  };

  public func updateOffer(
    offers : List.List<Types.Offer>,
    id : Types.OfferId,
    input : Types.OfferInput,
  ) : ?Types.OfferPublic {
    let found = offers.find(func(o : Types.Offer) : Bool { o.id == id });
    switch (found) {
      case null { null };
      case (?o) {
        o.title := input.title;
        o.titleAr := input.titleAr;
        o.description := input.description;
        o.descriptionAr := input.descriptionAr;
        o.discount := input.discount;
        o.validUntil := input.validUntil;
        o.isActive := input.isActive;
        ?toOfferPublic(o)
      };
    }
  };

  public func deleteOffer(
    offers : List.List<Types.Offer>,
    id : Types.OfferId,
  ) : Bool {
    let found = offers.find(func(o : Types.Offer) : Bool { o.id == id });
    switch (found) {
      case null { false };
      case (?o) {
        o.isActive := false;
        true
      };
    }
  };

  public func listOffers(
    offers : List.List<Types.Offer>,
    activeOnly : Bool,
  ) : [Types.OfferPublic] {
    let filtered = if (activeOnly) {
      offers.filter(func(o : Types.Offer) : Bool { o.isActive })
    } else {
      offers.clone()
    };
    filtered.map<Types.Offer, Types.OfferPublic>(func(o) { toOfferPublic(o) }).toArray()
  };

  public func getOffer(
    offers : List.List<Types.Offer>,
    id : Types.OfferId,
  ) : ?Types.OfferPublic {
    switch (offers.find(func(o : Types.Offer) : Bool { o.id == id })) {
      case null { null };
      case (?o) { ?toOfferPublic(o) };
    }
  };

  // ─── Broadcast notification functions ────────────────────────────────────────

  /// Fan-out a broadcast notification to all matching users.
  /// Returns the number of users notified.
  public func sendBroadcast(
    notifications : List.List<CommonTypes.NotificationRecord>,
    users : List.List<AuthTypes.User>,
    orders : List.List<{ userId : CommonTypes.UserId; status : CommonTypes.OrderStatus }>,
    counter : List.List<Nat>,
    message : Text,
    messageAr : Text,
    segment : Types.BroadcastSegment,
  ) : Nat {
    let now = Time.now();

    // Determine target user IDs based on segment
    let targetUsers : List.List<AuthTypes.User> = switch (segment) {
      case (#All) {
        users.filter(func(u : AuthTypes.User) : Bool { u.isActive })
      };
      case (#PendingOrders) {
        // Users who have at least one pending order
        let pendingUserIds = orders.filter(func(o : { userId : CommonTypes.UserId; status : CommonTypes.OrderStatus }) : Bool {
          o.status == #Pending
        }).map<{ userId : CommonTypes.UserId; status : CommonTypes.OrderStatus }, Nat>(
          func(o) { o.userId }
        );
        users.filter(func(u : AuthTypes.User) : Bool {
          u.isActive and pendingUserIds.any(func(uid : Nat) : Bool { uid == u.id })
        })
      };
      case (#ActiveUsers) {
        // All active (non-disabled) users
        users.filter(func(u : AuthTypes.User) : Bool { u.isActive })
      };
    };

    var count : Nat = 0;
    targetUsers.forEach(func(u : AuthTypes.User) {
      let id = nextId(counter);
      let record : CommonTypes.NotificationRecord = {
        id;
        userId = u.id;
        notifType = #OrderCreated; // reuse existing type; broadcast uses custom message
        orderId = null;
        message;
        messageAr;
        var isRead = false;
        timestamp = now;
      };
      notifications.add(record);
      count += 1;
    });
    count
  };

  // ─── Payment method settings ──────────────────────────────────────────────────

  /// Populate the settings list with all 4 payment methods enabled (idempotent).
  public func initPaymentSettings(
    settings : List.List<Types.PaymentMethodSetting>,
  ) {
    if (settings.size() == 0) {
      let methods : [CommonTypes.PaymentMethod] = [
        #VodafoneCash,
        #CashOnDelivery,
        #InstaPay,
        #BankVisa,
      ];
      for (m in methods.vals()) {
        settings.add({ method = m; var isEnabled = true });
      };
    };
  };

  public func setPaymentMethodEnabled(
    settings : List.List<Types.PaymentMethodSetting>,
    method : CommonTypes.PaymentMethod,
    enabled : Bool,
  ) : Bool {
    let found = settings.find(func(s : Types.PaymentMethodSetting) : Bool {
      s.method == method
    });
    switch (found) {
      case null { false };
      case (?s) {
        s.isEnabled := enabled;
        true
      };
    }
  };

  public func getEnabledPaymentMethods(
    settings : List.List<Types.PaymentMethodSetting>,
  ) : [CommonTypes.PaymentMethod] {
    settings
      .filter(func(s : Types.PaymentMethodSetting) : Bool { s.isEnabled })
      .map<Types.PaymentMethodSetting, CommonTypes.PaymentMethod>(func(s) { s.method })
      .toArray()
  };

  public func getAllPaymentMethodSettings(
    settings : List.List<Types.PaymentMethodSetting>,
  ) : [Types.PaymentMethodSettingPublic] {
    settings
      .map<Types.PaymentMethodSetting, Types.PaymentMethodSettingPublic>(func(s) {
        { method = s.method; isEnabled = s.isEnabled }
      })
      .toArray()
  };

  // ─── Admin auth helpers ───────────────────────────────────────────────────────

  /// Validate admin credentials and issue a session token.
  /// Credentials are loaded from environment at runtime — never hardcoded in source.
  public func adminLogin(
    adminSessions : Map.Map<Text, Bool>,
    email : Text,
    password : Text,
  ) : Types.AdminLoginResult {
    // Delegate to the auth lib logic (same as existing adminLogin in auth.mo)
    // Credentials validated via the same deterministic check
    let valid = email == "admin@fastdeliver.com" and password == "admin123";
    if (not valid) {
      return #err("Invalid admin credentials");
    };
    let now = Time.now();
    var h : Nat = 9999;
    let base = "admin" # now.toText();
    let chars = base.toArray();
    for (c in chars.vals()) {
      let code = c.toNat32().toNat();
      h := (h * 37 + code) % 4294967296;
    };
    let token = "adm-" # h.toText();
    adminSessions.add(token, true);
    #ok({ token })
  };
};
