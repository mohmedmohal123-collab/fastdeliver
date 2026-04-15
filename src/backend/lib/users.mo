import AuthTypes "../types/auth";
import List "mo:core/List";

module {
  public type User = AuthTypes.User;
  public type UserPublic = AuthTypes.UserPublic;

  func toPublic(user : User) : UserPublic {
    {
      id = user.id;
      email = user.email;
      name = user.name;
      phone = user.phone;
      isActive = user.isActive;
      createdAt = user.createdAt;
    }
  };

  public func getAllUsers(users : List.List<User>) : [UserPublic] {
    users.map<User, UserPublic>(func(u : User) : UserPublic { toPublic(u) }).toArray()
  };

  public func getUserById(
    users : List.List<User>,
    userId : Nat,
  ) : ?UserPublic {
    let found = users.find(func(u : User) : Bool { u.id == userId });
    switch (found) {
      case null { null };
      case (?u) { ?toPublic(u) };
    }
  };

  public func setUserActive(
    users : List.List<User>,
    userId : Nat,
    isActive : Bool,
  ) : { #ok : UserPublic; #err : Text } {
    let found = users.find(func(u : User) : Bool { u.id == userId });
    switch (found) {
      case null { #err("User not found") };
      case (?user) {
        user.isActive := isActive;
        #ok(toPublic(user))
      };
    }
  };

  public func searchUsers(
    users : List.List<User>,
    searchTerm : Text,
  ) : [UserPublic] {
    let lower = searchTerm.toLower();
    users.filter(func(u : User) : Bool {
      u.name.toLower().contains(#text lower) or u.email.toLower().contains(#text lower)
    }).map<User, UserPublic>(func(u : User) : UserPublic { toPublic(u) }).toArray()
  };
};
