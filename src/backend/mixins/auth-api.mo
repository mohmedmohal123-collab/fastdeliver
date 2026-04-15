import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  users : List.List<AuthTypes.User>,
  sessions : Map.Map<Text, AuthTypes.Session>,
  adminSessions : Map.Map<Text, Bool>,
  nextUserIdCounter : List.List<Nat>,
) {

  public func register(req : AuthTypes.RegisterRequest) : async { #ok : AuthTypes.UserPublic; #err : Text } {
    let nextId = switch (nextUserIdCounter.first()) {
      case (?id) { id };
      case null { 1 };
    };
    let result = AuthLib.registerUser(users, nextId, req);
    switch (result) {
      case (#ok(_)) {
        nextUserIdCounter.mapInPlace(func(_ : Nat) : Nat { nextId + 1 });
      };
      case (#err(_)) {};
    };
    result
  };

  public func login(email : Text, password : Text) : async AuthTypes.LoginResult {
    AuthLib.loginUser(users, sessions, email, password)
  };

  public func logout(token : Text) : async () {
    AuthLib.logoutUser(sessions, token)
  };

  public query func getMyProfile(token : Text) : async ?AuthTypes.UserPublic {
    AuthLib.getSessionUser(users, sessions, token)
  };

  public func updateMyProfile(token : Text, name : Text, phone : Text) : async { #ok : AuthTypes.UserPublic; #err : Text } {
    switch (AuthLib.getSessionUser(users, sessions, token)) {
      case null { #err("Invalid session") };
      case (?userPublic) {
        AuthLib.updateProfile(users, userPublic.id, name, phone)
      };
    }
  };

  public func adminLoginCall(email : Text, password : Text) : async { #ok : Text; #err : Text } {
    if (AuthLib.adminLogin(email, password)) {
      let now = Time.now();
      let token = AuthLib.generateAdminTokenSync(now);
      adminSessions.add(token, true);
      #ok(token)
    } else {
      #err("Invalid admin credentials")
    }
  };

  public query func isAdmin(token : Text) : async Bool {
    AuthLib.isAdminSession(adminSessions, token)
  };
};
