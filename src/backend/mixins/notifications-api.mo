import NotificationsLib "../lib/notifications";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import CommonTypes "../types/common";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  notifications : List.List<CommonTypes.NotificationRecord>,
  sessions : Map.Map<Text, AuthTypes.Session>,
  users : List.List<AuthTypes.User>,
  nextNotifIdCounter : List.List<Nat>,
) {

  /// Create and store a new notification (callable from other mixins/actor).
  public func createNotification(
    userId : Nat,
    notifType : CommonTypes.NotificationType,
    orderId : ?Nat,
    message : Text,
    messageAr : Text,
  ) : () {
    let id = switch (nextNotifIdCounter.first()) {
      case (?n) { n };
      case null { 1 };
    };
    let now = Time.now();
    let record = NotificationsLib.create(id, userId, notifType, orderId, message, messageAr, now);
    notifications.add(record);
    nextNotifIdCounter.mapInPlace(func(_ : Nat) : Nat { id + 1 });
  };

  public query func getMyNotifications(token : Text) : async [CommonTypes.NotificationPublic] {
    switch (AuthLib.getSessionUser(users, sessions, token)) {
      case null { [] };
      case (?userPublic) {
        NotificationsLib.getForUser(notifications, userPublic.id)
      };
    }
  };

  public func markNotificationRead(
    token : Text,
    notifId : Nat,
  ) : async { #ok; #err : Text } {
    switch (AuthLib.getSessionUser(users, sessions, token)) {
      case null { #err("Invalid session") };
      case (?userPublic) {
        let found = NotificationsLib.markRead(notifications, userPublic.id, notifId);
        if (found) { #ok } else { #err("Notification not found") }
      };
    }
  };

  public func markAllNotificationsRead(token : Text) : async { #ok; #err : Text } {
    switch (AuthLib.getSessionUser(users, sessions, token)) {
      case null { #err("Invalid session") };
      case (?userPublic) {
        NotificationsLib.markAllRead(notifications, userPublic.id);
        #ok
      };
    }
  };

  public query func getUnreadNotificationCount(token : Text) : async Nat {
    switch (AuthLib.getSessionUser(users, sessions, token)) {
      case null { 0 };
      case (?userPublic) {
        NotificationsLib.countUnread(notifications, userPublic.id)
      };
    }
  };
};
