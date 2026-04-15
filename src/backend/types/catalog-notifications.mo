import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;
  public type PaymentMethod = Common.PaymentMethod;

  // ─── Catalog Types ───────────────────────────────────────────────────────────

  public type ProductId = Nat;
  public type CompanyId = Nat;
  public type OfferId = Nat;

  public type Product = {
    id : ProductId;
    var name : Text;
    var nameAr : Text;
    var description : Text;
    var descriptionAr : Text;
    var price : Float;
    var category : Text;
    var imageUrl : Text;
    var isActive : Bool;
    var companyId : CompanyId;
    createdAt : Timestamp;
  };

  public type ProductPublic = {
    id : ProductId;
    name : Text;
    nameAr : Text;
    description : Text;
    descriptionAr : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    isActive : Bool;
    companyId : CompanyId;
    createdAt : Timestamp;
  };

  public type ProductInput = {
    name : Text;
    nameAr : Text;
    description : Text;
    descriptionAr : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    isActive : Bool;
    companyId : CompanyId;
  };

  public type Company = {
    id : CompanyId;
    var name : Text;
    var nameAr : Text;
    var description : Text;
    var descriptionAr : Text;
    var logoUrl : Text;
    var isActive : Bool;
    createdAt : Timestamp;
  };

  public type CompanyPublic = {
    id : CompanyId;
    name : Text;
    nameAr : Text;
    description : Text;
    descriptionAr : Text;
    logoUrl : Text;
    isActive : Bool;
    createdAt : Timestamp;
  };

  public type CompanyInput = {
    name : Text;
    nameAr : Text;
    description : Text;
    descriptionAr : Text;
    logoUrl : Text;
    isActive : Bool;
  };

  public type Offer = {
    id : OfferId;
    var title : Text;
    var titleAr : Text;
    var description : Text;
    var descriptionAr : Text;
    var discount : Float;
    var validUntil : Timestamp;
    var isActive : Bool;
    createdAt : Timestamp;
  };

  public type OfferPublic = {
    id : OfferId;
    title : Text;
    titleAr : Text;
    description : Text;
    descriptionAr : Text;
    discount : Float;
    validUntil : Timestamp;
    isActive : Bool;
    createdAt : Timestamp;
  };

  public type OfferInput = {
    title : Text;
    titleAr : Text;
    description : Text;
    descriptionAr : Text;
    discount : Float;
    validUntil : Timestamp;
    isActive : Bool;
  };

  // ─── Broadcast Notification Types ────────────────────────────────────────────

  public type BroadcastSegment = {
    #All;
    #PendingOrders;
    #ActiveUsers;
  };

  public type BroadcastNotifType = {
    #Broadcast;
  };

  // Extended notification type that includes Broadcast
  public type AdminNotifType = {
    #Broadcast;
    #Promotion;
    #SystemAlert;
  };

  public type BroadcastRecord = {
    id : Nat;
    message : Text;
    messageAr : Text;
    segment : BroadcastSegment;
    sentAt : Timestamp;
    sentByAdmin : Bool;
  };

  // ─── Payment Settings ─────────────────────────────────────────────────────────

  public type PaymentMethodSetting = {
    method : PaymentMethod;
    var isEnabled : Bool;
  };

  public type PaymentMethodSettingPublic = {
    method : PaymentMethod;
    isEnabled : Bool;
  };

  // ─── Admin Auth ───────────────────────────────────────────────────────────────

  public type AdminLoginResult = {
    #ok : { token : Text };
    #err : Text;
  };
};
