import UsersLib "../lib/users";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import List "mo:core/List";
import Map "mo:core/Map";

mixin (
  users : List.List<AuthTypes.User>,
  adminSessions : Map.Map<Text, Bool>,
) {

  public query func getAllUsersAdmin(token : Text) : async { #ok : [AuthTypes.UserPublic]; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    #ok(UsersLib.getAllUsers(users))
  };

  public query func getUserByIdAdmin(token : Text, userId : Nat) : async { #ok : ?AuthTypes.UserPublic; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    #ok(UsersLib.getUserById(users, userId))
  };

  public func setUserActiveAdmin(token : Text, userId : Nat, isActive : Bool) : async { #ok : AuthTypes.UserPublic; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    UsersLib.setUserActive(users, userId, isActive)
  };

  public query func searchUsersAdmin(token : Text, searchQuery : Text) : async { #ok : [AuthTypes.UserPublic]; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    #ok(UsersLib.searchUsers(users, searchQuery))
  };
};
