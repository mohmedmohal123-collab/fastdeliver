import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  public type User = {
    id : UserId;
    var email : Text;
    var passwordHash : Text;
    var name : Text;
    var phone : Text;
    var isActive : Bool;
    createdAt : Timestamp;
  };

  public type UserPublic = {
    id : UserId;
    email : Text;
    name : Text;
    phone : Text;
    isActive : Bool;
    createdAt : Timestamp;
  };

  public type Session = {
    userId : UserId;
    token : Text;
    createdAt : Timestamp;
  };

  public type RegisterRequest = {
    email : Text;
    password : Text;
    name : Text;
    phone : Text;
  };

  public type LoginResult = {
    #ok : { token : Text; user : UserPublic };
    #err : Text;
  };
};
