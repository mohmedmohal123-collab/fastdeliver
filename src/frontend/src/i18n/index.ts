type Lang = "ar" | "en";

const translations: Record<string, Record<Lang, string>> = {
  // App
  "app.name": { ar: "فاست ديليفر", en: "FastDeliver" },
  "app.tagline": { ar: "توصيل سريع وموثوق", en: "Fast & Reliable Delivery" },

  // Nav
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.browse": { ar: "تصفح", en: "Browse" },
  "nav.orders": { ar: "طلباتي", en: "My Orders" },
  "nav.newOrder": { ar: "توصيلة جديدة", en: "New Delivery" },
  "nav.profile": { ar: "الملف الشخصي", en: "Profile" },
  "nav.settings": { ar: "الإعدادات", en: "Settings" },
  "nav.logout": { ar: "تسجيل الخروج", en: "Logout" },
  "nav.dashboard": { ar: "لوحة التحكم", en: "Dashboard" },
  "nav.users": { ar: "المستخدمون", en: "Users" },
  "nav.search": { ar: "بحث...", en: "Search..." },
  "nav.notifications": { ar: "الإشعارات", en: "Notifications" },

  // Auth
  "auth.login": { ar: "تسجيل الدخول", en: "Login" },
  "auth.signup": { ar: "إنشاء حساب", en: "Sign Up" },
  "auth.adminLogin": { ar: "دخول المدير", en: "Admin Login" },
  "auth.email": { ar: "البريد الإلكتروني", en: "Email" },
  "auth.password": { ar: "كلمة المرور", en: "Password" },
  "auth.name": { ar: "الاسم الكامل", en: "Full Name" },
  "auth.phone": { ar: "رقم الهاتف", en: "Phone Number" },
  "auth.noAccount": { ar: "ليس لديك حساب؟", en: "Don't have an account?" },
  "auth.hasAccount": {
    ar: "لديك حساب بالفعل؟",
    en: "Already have an account?",
  },
  "auth.forgotPassword": { ar: "نسيت كلمة المرور؟", en: "Forgot password?" },

  // Common buttons
  "btn.save": { ar: "حفظ", en: "Save" },
  "btn.cancel": { ar: "إلغاء", en: "Cancel" },
  "btn.logout": { ar: "تسجيل الخروج", en: "Logout" },
  "btn.submit": { ar: "إرسال", en: "Submit" },
  "btn.confirm": { ar: "تأكيد", en: "Confirm" },
  "btn.delete": { ar: "حذف", en: "Delete" },
  "btn.edit": { ar: "تعديل", en: "Edit" },
  "btn.back": { ar: "رجوع", en: "Back" },
  "btn.next": { ar: "التالي", en: "Next" },
  "btn.search": { ar: "بحث", en: "Search" },
  "btn.newOrder": { ar: "طلب جديد", en: "New Order" },
  "btn.trackOrder": { ar: "تتبع الطلب", en: "Track Order" },
  "btn.viewAll": { ar: "عرض الكل", en: "View All" },

  // Order statuses
  "status.Pending": { ar: "قيد الانتظار", en: "Pending" },
  "status.Accepted": { ar: "تم القبول", en: "Accepted" },
  "status.InTransit": { ar: "في الطريق", en: "In Transit" },
  "status.Delivered": { ar: "تم التوصيل", en: "Delivered" },
  "status.Cancelled": { ar: "ملغي", en: "Cancelled" },

  // Payment methods
  "payment.VodafoneCash": { ar: "فودافون كاش", en: "Vodafone Cash" },
  "payment.CashOnDelivery": {
    ar: "الدفع عند الاستلام",
    en: "Cash on Delivery",
  },
  "payment.InstaPay": { ar: "إنستاباي", en: "InstaPay" },
  "payment.BankVisa": { ar: "فيزا البنك", en: "Bank Visa" },

  // Page titles
  "page.home": { ar: "الرئيسية", en: "Home" },
  "page.orders": { ar: "الطلبات", en: "Orders" },
  "page.newOrder": { ar: "طلب توصيل جديد", en: "New Delivery Order" },
  "page.orderDetail": { ar: "تفاصيل الطلب", en: "Order Details" },
  "page.profile": { ar: "الملف الشخصي", en: "My Profile" },
  "page.settings": { ar: "الإعدادات", en: "Settings" },
  "page.adminDashboard": { ar: "لوحة التحكم", en: "Admin Dashboard" },
  "page.adminOrders": { ar: "إدارة الطلبات", en: "Manage Orders" },
  "page.adminUsers": { ar: "إدارة المستخدمين", en: "Manage Users" },
  "page.notifications": { ar: "مركز الإشعارات", en: "Notification Center" },

  // Orders
  "order.pickup": { ar: "عنوان الاستلام", en: "Pickup Address" },
  "order.dropoff": { ar: "عنوان التوصيل", en: "Dropoff Address" },
  "order.item": { ar: "وصف الشيء", en: "Item Description" },
  "order.payment": { ar: "طريقة الدفع", en: "Payment Method" },
  "order.price": { ar: "السعر التقديري", en: "Estimated Price" },
  "order.id": { ar: "رقم الطلب", en: "Order ID" },
  "order.date": { ar: "التاريخ", en: "Date" },
  "order.empty": { ar: "لا توجد طلبات بعد", en: "No orders yet" },
  "order.emptyHint": {
    ar: "ابدأ بطلب توصيلة جديدة",
    en: "Start by creating a new delivery",
  },

  // Settings
  "settings.language": { ar: "اللغة", en: "Language" },
  "settings.arabic": { ar: "العربية", en: "Arabic" },
  "settings.english": { ar: "الإنجليزية", en: "English" },
  "settings.theme": { ar: "المظهر", en: "Theme" },
  "settings.notifications": { ar: "الإشعارات", en: "Notifications" },

  // Notifications
  "notif.title": { ar: "الإشعارات", en: "Notifications" },
  "notif.noNotifications": {
    ar: "لا توجد إشعارات",
    en: "No notifications yet",
  },
  "notif.noNotificationsHint": {
    ar: "ستظهر هنا إشعارات حالة طلباتك",
    en: "Order status updates will appear here",
  },
  "notif.markAllRead": { ar: "تحديد الكل كمقروء", en: "Mark all as read" },
  "notif.viewAll": { ar: "عرض كل الإشعارات", en: "View all notifications" },
  "notif.justNow": { ar: "الآن", en: "Just now" },
  "notif.minutesAgo": { ar: "دقيقة مضت", en: "minutes ago" },
  "notif.hoursAgo": { ar: "ساعة مضت", en: "hours ago" },
  "notif.daysAgo": { ar: "يوم مضى", en: "days ago" },
  "notif.unread": { ar: "غير مقروء", en: "Unread" },
  "notif.viewOrder": { ar: "عرض الطلب", en: "View Order" },
  "notif.allCaughtUp": {
    ar: "أنت على اطلاع دائم!",
    en: "You're all caught up!",
  },

  // Notification type labels
  "notifType.OrderCreated": { ar: "تم إنشاء الطلب", en: "Order Created" },
  "notifType.OrderAccepted": { ar: "تم قبول الطلب", en: "Order Accepted" },
  "notifType.OrderInTransit": { ar: "الطلب في الطريق", en: "Order In Transit" },
  "notifType.CourierArrived": {
    ar: "المندوب وصل",
    en: "Courier Arrived",
  },
  "notifType.OrderDelivered": { ar: "تم التوصيل", en: "Order Delivered" },
  "notifType.OrderCancelled": { ar: "تم إلغاء الطلب", en: "Order Cancelled" },
  "notifType.PaymentProcessed": {
    ar: "تمت معالجة الدفع",
    en: "Payment Processed",
  },
  "notifType.PaymentFailed": { ar: "فشل الدفع", en: "Payment Failed" },

  // Live GPS / Map
  "map.liveTracking": { ar: "التتبع المباشر", en: "Live Tracking" },
  "map.courierLocation": { ar: "موقع المندوب", en: "Courier Location" },
  "map.estimatedArrival": {
    ar: "الوقت المتوقع للوصول",
    en: "Estimated Arrival",
  },
  "map.gpsNotAvailable": {
    ar: "تتبع GPS غير متاح حاليًا",
    en: "GPS tracking not available",
  },
  "map.mapLoading": { ar: "جار تحميل الخريطة...", en: "Loading map..." },
  "map.etaMinutes": { ar: "دقيقة", en: "min" },
  "map.liveLabel": { ar: "مباشر", en: "LIVE" },
  "map.pickupPoint": { ar: "نقطة الاستلام", en: "Pickup Point" },
  "map.dropoffPoint": { ar: "نقطة التوصيل", en: "Dropoff Point" },

  // Status extended (PickedUp)
  "status.PickedUp": { ar: "تم الاستلام من العميل", en: "Picked Up" },

  // Courier section
  "courier.title": { ar: "مندوب التوصيل", en: "Delivery Courier" },
  "courier.vehicle": { ar: "المركبة", en: "Vehicle" },
  "courier.newOrders": { ar: "الطلبات الجديدة", en: "New Orders" },
  "courier.myOrders": { ar: "طلباتي", en: "My Orders" },
  "courier.totalDeliveries": { ar: "إجمالي التوصيلات", en: "Total Deliveries" },
  "courier.thisMonth": { ar: "هذا الشهر", en: "This Month" },
  "courier.pendingOrders": { ar: "طلبات معلقة", en: "Pending Orders" },
  "courier.activeOrders": { ar: "طلبات نشطة", en: "Active Orders" },
  "courier.noNewOrders": { ar: "لا توجد طلبات جديدة", en: "No new orders" },
  "courier.noMyOrders": {
    ar: "لا توجد طلبات مسندة لك",
    en: "No assigned orders",
  },
  "courier.acceptOrder": { ar: "قبول الطلب", en: "Accept Order" },
  "courier.viewOrder": { ar: "عرض الطلب", en: "View Order" },
  "courier.confirmPickup": { ar: "تأكيد الاستلام", en: "Confirm Pickup" },
  "courier.confirmDelivery": { ar: "تأكيد التوصيل", en: "Confirm Delivery" },
  "courier.orderAccepted": {
    ar: "تم قبول الطلب بنجاح",
    en: "Order accepted successfully",
  },
  "courier.pickupConfirmed": {
    ar: "تم تأكيد الاستلام",
    en: "Pickup confirmed",
  },
  "courier.deliveryConfirmed": {
    ar: "تم تأكيد التوصيل",
    en: "Delivery confirmed",
  },
  "courier.accepting": { ar: "جار القبول...", en: "Accepting..." },
  "courier.confirming": { ar: "جار التأكيد...", en: "Confirming..." },
  "courier.profile": { ar: "الملف الشخصي", en: "Profile" },

  // Auth courier
  "auth.courierLogin": { ar: "دخول المندوب", en: "Courier Login" },
  "auth.courierRegister": { ar: "تسجيل مندوب جديد", en: "Register as Courier" },
  "auth.vehicleType": { ar: "نوع المركبة", en: "Vehicle Type" },
  "auth.noCourierAccount": {
    ar: "لا تمتلك حساب مندوب؟",
    en: "No courier account?",
  },
  "auth.hasCourierAccount": {
    ar: "لديك حساب مندوب بالفعل؟",
    en: "Already have a courier account?",
  },

  // Vehicle types
  "vehicle.Motorcycle": { ar: "دراجة نارية", en: "Motorcycle" },
  "vehicle.Car": { ar: "سيارة", en: "Car" },
  "vehicle.Bicycle": { ar: "دراجة", en: "Bicycle" },
  "vehicle.Truck": { ar: "شاحنة", en: "Truck" },

  // GPS
  "gps.requesting": {
    ar: "جار طلب إذن الموقع...",
    en: "Requesting location permission...",
  },
  "gps.denied": {
    ar: "تم رفض إذن الموقع. يرجى السماح للتطبيق بالوصول للموقع.",
    en: "Location permission denied. Please allow location access.",
  },
  "gps.error": {
    ar: "تعذر الحصول على الموقع الجغرافي",
    en: "Could not get your location",
  },
  "gps.getting": { ar: "جار تحديد موقعك...", en: "Getting your location..." },

  // Order progress steps
  "progress.Pending": { ar: "قيد الانتظار", en: "Pending" },
  "progress.Accepted": { ar: "تم القبول", en: "Accepted" },
  "progress.PickedUp": { ar: "تم الاستلام", en: "Picked Up" },
  "progress.InTransit": { ar: "في الطريق", en: "In Transit" },
  "progress.Delivered": { ar: "تم التوصيل", en: "Delivered" },

  // Page courier
  "page.courierHome": { ar: "لوحة المندوب", en: "Courier Dashboard" },
  "page.courierOrders": { ar: "الطلبات", en: "Orders" },

  // Order extra
  "order.customer": { ar: "العميل", en: "Customer" },
  "order.customerPhone": { ar: "هاتف العميل", en: "Customer Phone" },

  // Products
  "nav.products": { ar: "المنتجات", en: "Products" },
  "nav.companies": { ar: "الشركات", en: "Companies" },
  "nav.offers": { ar: "العروض", en: "Offers" },
  "nav.broadcastNotifications": {
    ar: "إرسال إشعارات",
    en: "Broadcast Notifications",
  },
  "nav.paymentSettings": { ar: "إعدادات الدفع", en: "Payment Settings" },
  "page.adminProducts": { ar: "إدارة المنتجات", en: "Manage Products" },
  "page.adminCompanies": { ar: "إدارة الشركات", en: "Manage Companies" },
  "page.adminOffers": { ar: "إدارة العروض", en: "Manage Offers" },
  "page.adminBroadcast": {
    ar: "إرسال الإشعارات",
    en: "Broadcast Notifications",
  },
  "page.adminPaymentSettings": { ar: "إعدادات الدفع", en: "Payment Settings" },
  "product.name": { ar: "اسم المنتج (إنجليزي)", en: "Product Name (English)" },
  "product.nameAr": { ar: "اسم المنتج (عربي)", en: "Product Name (Arabic)" },
  "product.description": { ar: "الوصف (إنجليزي)", en: "Description (English)" },
  "product.descriptionAr": { ar: "الوصف (عربي)", en: "Description (Arabic)" },
  "product.price": { ar: "السعر (ج.م)", en: "Price (EGP)" },
  "product.category": { ar: "التصنيف", en: "Category" },
  "product.imageUrl": { ar: "رابط الصورة", en: "Image URL" },
  "product.company": { ar: "الشركة", en: "Company" },
  "product.active": { ar: "نشط", en: "Active" },
  "product.addNew": { ar: "إضافة منتج جديد", en: "Add New Product" },
  "product.edit": { ar: "تعديل المنتج", en: "Edit Product" },
  "product.deleteConfirm": {
    ar: "هل أنت متأكد من حذف هذا المنتج؟",
    en: "Are you sure you want to delete this product?",
  },
  "product.empty": { ar: "لا توجد منتجات بعد", en: "No products yet" },
  "company.name": { ar: "اسم الشركة (إنجليزي)", en: "Company Name (English)" },
  "company.nameAr": { ar: "اسم الشركة (عربي)", en: "Company Name (Arabic)" },
  "company.description": { ar: "الوصف (إنجليزي)", en: "Description (English)" },
  "company.descriptionAr": { ar: "الوصف (عربي)", en: "Description (Arabic)" },
  "company.logoUrl": { ar: "رابط الشعار", en: "Logo URL" },
  "company.active": { ar: "نشطة", en: "Active" },
  "company.addNew": { ar: "إضافة شركة جديدة", en: "Add New Company" },
  "company.edit": { ar: "تعديل الشركة", en: "Edit Company" },
  "company.deleteConfirm": {
    ar: "هل أنت متأكد من حذف هذه الشركة؟",
    en: "Are you sure you want to delete this company?",
  },
  "company.empty": { ar: "لا توجد شركات بعد", en: "No companies yet" },
  "offer.title": { ar: "عنوان العرض (إنجليزي)", en: "Offer Title (English)" },
  "offer.titleAr": { ar: "عنوان العرض (عربي)", en: "Offer Title (Arabic)" },
  "offer.description": { ar: "الوصف (إنجليزي)", en: "Description (English)" },
  "offer.descriptionAr": { ar: "الوصف (عربي)", en: "Description (Arabic)" },
  "offer.discount": { ar: "نسبة الخصم %", en: "Discount %" },
  "offer.validUntil": { ar: "صالح حتى", en: "Valid Until" },
  "offer.active": { ar: "نشط", en: "Active" },
  "offer.addNew": { ar: "إضافة عرض جديد", en: "Add New Offer" },
  "offer.edit": { ar: "تعديل العرض", en: "Edit Offer" },
  "offer.deleteConfirm": {
    ar: "هل أنت متأكد من حذف هذا العرض؟",
    en: "Are you sure you want to delete this offer?",
  },
  "offer.empty": { ar: "لا توجد عروض بعد", en: "No offers yet" },
  "admin.sendNotif": { ar: "إرسال إشعار", en: "Send Notification" },
  "admin.notifTitle": { ar: "عنوان الإشعار", en: "Notification Title" },
  "admin.notifMessage": {
    ar: "نص الإشعار (إنجليزي)",
    en: "Notification Message (English)",
  },
  "admin.notifMessageAr": {
    ar: "نص الإشعار (عربي)",
    en: "Notification Message (Arabic)",
  },
  "admin.notifSent": {
    ar: "تم إرسال الإشعار بنجاح",
    en: "Notification sent successfully",
  },
  "admin.targetAll": { ar: "جميع المستخدمين", en: "All Users" },
  "admin.paymentMethod": {
    ar: "طريقة الدفع للمستخدم",
    en: "User Payment Method",
  },
  "upload.image": { ar: "صورة المنتج", en: "Product Image" },
  "upload.logo": { ar: "شعار الشركة", en: "Company Logo" },
  "misc.error": { ar: "حدث خطأ", en: "An error occurred" },
  "misc.noResults": { ar: "لا توجد نتائج", en: "No results found" },
  "misc.egp": { ar: "ج.م", en: "EGP" },
  "misc.greeting": { ar: "مرحباً", en: "Hello" },
};

export function t(key: string, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en ?? key;
}

export type { Lang };
