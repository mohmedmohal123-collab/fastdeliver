import Types "../types/catalog-notifications";
import CommonTypes "../types/common";
import AuthTypes "../types/auth";
import OrderTypes "../types/orders";
import List "mo:core/List";
import Map "mo:core/Map";
import AuthLib "../lib/auth";
import CatalogLib "../lib/catalog-notifications";

// Mixin: exposes admin catalog management, broadcast notifications, and payment settings.
// State injected: products, companies, offers, paymentSettings, notifications, users, orders,
//                 adminSessions, counters.
mixin (
  products : List.List<Types.Product>,
  companies : List.List<Types.Company>,
  offers : List.List<Types.Offer>,
  paymentSettings : List.List<Types.PaymentMethodSetting>,
  notifications : List.List<CommonTypes.NotificationRecord>,
  users : List.List<AuthTypes.User>,
  orders : List.List<OrderTypes.Order>,
  adminSessions : Map.Map<Text, Bool>,
  nextProductIdCounter : List.List<Nat>,
  nextCompanyIdCounter : List.List<Nat>,
  nextOfferIdCounter : List.List<Nat>,
  nextNotifIdCounter : List.List<Nat>,
) {

  // ─── Product API (admin-gated writes, public reads) ───────────────────────────

  public shared ({ caller = _ }) func adminCreateProduct(
    token : Text,
    input : Types.ProductInput,
  ) : async { #ok : Types.ProductPublic; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    let pub = CatalogLib.createProduct(products, nextProductIdCounter, input);
    #ok(pub)
  };

  public shared ({ caller = _ }) func adminUpdateProduct(
    token : Text,
    id : Types.ProductId,
    input : Types.ProductInput,
  ) : async { #ok : Types.ProductPublic; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    switch (CatalogLib.updateProduct(products, id, input)) {
      case null { #err("Product not found") };
      case (?pub) { #ok(pub) };
    }
  };

  public shared ({ caller = _ }) func adminDeleteProduct(
    token : Text,
    id : Types.ProductId,
  ) : async { #ok; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    let deleted = CatalogLib.deleteProduct(products, id);
    if (deleted) { #ok } else { #err("Product not found") }
  };

  public query func listProducts(activeOnly : Bool) : async [Types.ProductPublic] {
    CatalogLib.listProducts(products, activeOnly)
  };

  public query func getProduct(id : Types.ProductId) : async ?Types.ProductPublic {
    CatalogLib.getProduct(products, id)
  };

  // ─── Company API ──────────────────────────────────────────────────────────────

  public shared ({ caller = _ }) func adminCreateCompany(
    token : Text,
    input : Types.CompanyInput,
  ) : async { #ok : Types.CompanyPublic; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    let pub = CatalogLib.createCompany(companies, nextCompanyIdCounter, input);
    #ok(pub)
  };

  public shared ({ caller = _ }) func adminUpdateCompany(
    token : Text,
    id : Types.CompanyId,
    input : Types.CompanyInput,
  ) : async { #ok : Types.CompanyPublic; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    switch (CatalogLib.updateCompany(companies, id, input)) {
      case null { #err("Company not found") };
      case (?pub) { #ok(pub) };
    }
  };

  public shared ({ caller = _ }) func adminDeleteCompany(
    token : Text,
    id : Types.CompanyId,
  ) : async { #ok; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    let deleted = CatalogLib.deleteCompany(companies, id);
    if (deleted) { #ok } else { #err("Company not found") }
  };

  public query func listCompanies(activeOnly : Bool) : async [Types.CompanyPublic] {
    CatalogLib.listCompanies(companies, activeOnly)
  };

  public query func getCompany(id : Types.CompanyId) : async ?Types.CompanyPublic {
    CatalogLib.getCompany(companies, id)
  };

  // ─── Offer API ────────────────────────────────────────────────────────────────

  public shared ({ caller = _ }) func adminCreateOffer(
    token : Text,
    input : Types.OfferInput,
  ) : async { #ok : Types.OfferPublic; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    let pub = CatalogLib.createOffer(offers, nextOfferIdCounter, input);
    #ok(pub)
  };

  public shared ({ caller = _ }) func adminUpdateOffer(
    token : Text,
    id : Types.OfferId,
    input : Types.OfferInput,
  ) : async { #ok : Types.OfferPublic; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    switch (CatalogLib.updateOffer(offers, id, input)) {
      case null { #err("Offer not found") };
      case (?pub) { #ok(pub) };
    }
  };

  public shared ({ caller = _ }) func adminDeleteOffer(
    token : Text,
    id : Types.OfferId,
  ) : async { #ok; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    let deleted = CatalogLib.deleteOffer(offers, id);
    if (deleted) { #ok } else { #err("Offer not found") }
  };

  public query func listOffers(activeOnly : Bool) : async [Types.OfferPublic] {
    CatalogLib.listOffers(offers, activeOnly)
  };

  public query func getOffer(id : Types.OfferId) : async ?Types.OfferPublic {
    CatalogLib.getOffer(offers, id)
  };

  /// Returns only currently-active offers — for the user browse page (no admin auth required).
  public query func getActiveOffers() : async [Types.OfferPublic] {
    CatalogLib.listOffers(offers, true)
  };

  /// Returns only currently-active companies — for the user browse page (no admin auth required).
  public query func getActiveCompanies() : async [Types.CompanyPublic] {
    CatalogLib.listCompanies(companies, true)
  };

  /// Returns only currently-active products — for the user browse page (no admin auth required).
  public query func getActiveProducts() : async [Types.ProductPublic] {
    CatalogLib.listProducts(products, true)
  };

  // ─── Broadcast Notification API ───────────────────────────────────────────────

  public shared ({ caller = _ }) func adminSendBroadcastNotification(
    token : Text,
    message : Text,
    messageAr : Text,
    segment : Types.BroadcastSegment,
  ) : async { #ok : Nat; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    // Adapt orders list to the shape expected by sendBroadcast
    let orderSlices = orders.map<OrderTypes.Order, { userId : CommonTypes.UserId; status : CommonTypes.OrderStatus }>(
      func(o) { { userId = o.userId; status = o.status } }
    );
    let count = CatalogLib.sendBroadcast(
      notifications,
      users,
      orderSlices,
      nextNotifIdCounter,
      message,
      messageAr,
      segment,
    );
    #ok(count)
  };

  // ─── Payment Method Settings API ─────────────────────────────────────────────

  public shared ({ caller = _ }) func adminSetPaymentMethodEnabled(
    token : Text,
    method : CommonTypes.PaymentMethod,
    enabled : Bool,
  ) : async { #ok; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Unauthorized: admin token required");
    };
    let updated = CatalogLib.setPaymentMethodEnabled(paymentSettings, method, enabled);
    if (updated) { #ok } else { #err("Payment method setting not found") }
  };

  public query func getEnabledPaymentMethods() : async [CommonTypes.PaymentMethod] {
    CatalogLib.getEnabledPaymentMethods(paymentSettings)
  };

  public query func getAllPaymentMethodSettings() : async [Types.PaymentMethodSettingPublic] {
    CatalogLib.getAllPaymentMethodSettings(paymentSettings)
  };

};
