import Types "../types/auth";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Char "mo:core/Char";
import Nat32 "mo:core/Nat32";

module {
  public type User = Types.User;
  public type UserPublic = Types.UserPublic;
  public type Session = Types.Session;
  public type RegisterRequest = Types.RegisterRequest;
  public type LoginResult = Types.LoginResult;

  // Simple deterministic hash: fold chars with multiplier
  public func hashPassword(password : Text) : Text {
    let chars = password.toArray();
    var h : Nat = 5381;
    for (c in chars.vals()) {
      let code = c.toNat32().toNat();
      h := (h * 33 + code) % 4294967296;
    };
    "h:" # h.toText()
  };

  public func toPublic(user : User) : UserPublic {
    {
      id = user.id;
      email = user.email;
      name = user.name;
      phone = user.phone;
      isActive = user.isActive;
      createdAt = user.createdAt;
    }
  };

  public func registerUser(
    users : List.List<User>,
    nextId : Nat,
    req : RegisterRequest,
  ) : { #ok : UserPublic; #err : Text } {
    let existing = users.find(func(u : User) : Bool {
      u.email == req.email
    });
    switch (existing) {
      case (?_) { #err("Email already registered") };
      case null {
        let now = Time.now();
        let user : User = {
          id = nextId;
          var email = req.email;
          var passwordHash = hashPassword(req.password);
          var name = req.name;
          var phone = req.phone;
          var isActive = true;
          createdAt = now;
        };
        users.add(user);
        #ok(toPublic(user))
      };
    }
  };

  public func generateTokenSync(userId : Nat, now : Int) : Text {
    let base = userId.toText() # now.toText();
    let chars = base.toArray();
    var h : Nat = 1337;
    for (c in chars.vals()) {
      let code = c.toNat32().toNat();
      h := (h * 31 + code) % 4294967296;
    };
    "tok-" # userId.toText() # "-" # h.toText()
  };

  public func loginUser(
    users : List.List<User>,
    sessions : Map.Map<Text, Session>,
    email : Text,
    password : Text,
  ) : LoginResult {
    let pwHash = hashPassword(password);
    let found = users.find(func(u : User) : Bool {
      u.email == email and u.passwordHash == pwHash and u.isActive
    });
    switch (found) {
      case null { #err("Invalid email or password") };
      case (?user) {
        let now = Time.now();
        let token = generateTokenSync(user.id, now);
        let session : Session = { userId = user.id; token; createdAt = now };
        sessions.add(token, session);
        #ok({ token; user = toPublic(user) })
      };
    }
  };

  public func logoutUser(
    sessions : Map.Map<Text, Session>,
    token : Text,
  ) : () {
    sessions.remove(token)
  };

  public func getSessionUser(
    users : List.List<User>,
    sessions : Map.Map<Text, Session>,
    token : Text,
  ) : ?UserPublic {
    switch (sessions.get(token)) {
      case null { null };
      case (?session) {
        let found = users.find(func(u : User) : Bool {
          u.id == session.userId
        });
        switch (found) {
          case null { null };
          case (?user) { ?toPublic(user) };
        }
      };
    }
  };

  public func updateProfile(
    users : List.List<User>,
    userId : Nat,
    name : Text,
    phone : Text,
  ) : { #ok : UserPublic; #err : Text } {
    let found = users.find(func(u : User) : Bool { u.id == userId });
    switch (found) {
      case null { #err("User not found") };
      case (?user) {
        user.name := name;
        user.phone := phone;
        #ok(toPublic(user))
      };
    }
  };

  public func adminLogin(email : Text, password : Text) : Bool {
    email == "admin@fastdeliver.com" and password == "admin123"
  };

  public func generateAdminTokenSync(now : Int) : Text {
    var h : Nat = 9999;
    let base = "admin" # now.toText();
    let chars = base.toArray();
    for (c in chars.vals()) {
      let code = c.toNat32().toNat();
      h := (h * 37 + code) % 4294967296;
    };
    "adm-" # h.toText()
  };

  public func isAdminSession(
    adminSessions : Map.Map<Text, Bool>,
    token : Text,
  ) : Bool {
    switch (adminSessions.get(token)) {
      case (?true) { true };
      case _ { false };
    }
  };

  public func generateToken() : async Text {
    generateTokenSync(0, Time.now())
  };
};
