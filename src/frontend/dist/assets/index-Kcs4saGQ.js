import { r as reactExports, j as jsxRuntimeExports, z as React, e as clsx, h as cn } from "./index-DzhgL1zh.js";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = /* @__PURE__ */ createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const translations = {
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
    en: "Already have an account?"
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
    en: "Cash on Delivery"
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
    en: "Start by creating a new delivery"
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
    en: "No notifications yet"
  },
  "notif.noNotificationsHint": {
    ar: "ستظهر هنا إشعارات حالة طلباتك",
    en: "Order status updates will appear here"
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
    en: "You're all caught up!"
  },
  // Notification type labels
  "notifType.OrderCreated": { ar: "تم إنشاء الطلب", en: "Order Created" },
  "notifType.OrderAccepted": { ar: "تم قبول الطلب", en: "Order Accepted" },
  "notifType.OrderInTransit": { ar: "الطلب في الطريق", en: "Order In Transit" },
  "notifType.CourierArrived": {
    ar: "المندوب وصل",
    en: "Courier Arrived"
  },
  "notifType.OrderDelivered": { ar: "تم التوصيل", en: "Order Delivered" },
  "notifType.OrderCancelled": { ar: "تم إلغاء الطلب", en: "Order Cancelled" },
  "notifType.PaymentProcessed": {
    ar: "تمت معالجة الدفع",
    en: "Payment Processed"
  },
  "notifType.PaymentFailed": { ar: "فشل الدفع", en: "Payment Failed" },
  // Live GPS / Map
  "map.liveTracking": { ar: "التتبع المباشر", en: "Live Tracking" },
  "map.courierLocation": { ar: "موقع المندوب", en: "Courier Location" },
  "map.estimatedArrival": {
    ar: "الوقت المتوقع للوصول",
    en: "Estimated Arrival"
  },
  "map.gpsNotAvailable": {
    ar: "تتبع GPS غير متاح حاليًا",
    en: "GPS tracking not available"
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
    en: "No assigned orders"
  },
  "courier.acceptOrder": { ar: "قبول الطلب", en: "Accept Order" },
  "courier.viewOrder": { ar: "عرض الطلب", en: "View Order" },
  "courier.confirmPickup": { ar: "تأكيد الاستلام", en: "Confirm Pickup" },
  "courier.confirmDelivery": { ar: "تأكيد التوصيل", en: "Confirm Delivery" },
  "courier.orderAccepted": {
    ar: "تم قبول الطلب بنجاح",
    en: "Order accepted successfully"
  },
  "courier.pickupConfirmed": {
    ar: "تم تأكيد الاستلام",
    en: "Pickup confirmed"
  },
  "courier.deliveryConfirmed": {
    ar: "تم تأكيد التوصيل",
    en: "Delivery confirmed"
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
    en: "No courier account?"
  },
  "auth.hasCourierAccount": {
    ar: "لديك حساب مندوب بالفعل؟",
    en: "Already have a courier account?"
  },
  // Vehicle types
  "vehicle.Motorcycle": { ar: "دراجة نارية", en: "Motorcycle" },
  "vehicle.Car": { ar: "سيارة", en: "Car" },
  "vehicle.Bicycle": { ar: "دراجة", en: "Bicycle" },
  "vehicle.Truck": { ar: "شاحنة", en: "Truck" },
  // GPS
  "gps.requesting": {
    ar: "جار طلب إذن الموقع...",
    en: "Requesting location permission..."
  },
  "gps.denied": {
    ar: "تم رفض إذن الموقع. يرجى السماح للتطبيق بالوصول للموقع.",
    en: "Location permission denied. Please allow location access."
  },
  "gps.error": {
    ar: "تعذر الحصول على الموقع الجغرافي",
    en: "Could not get your location"
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
    en: "Broadcast Notifications"
  },
  "nav.paymentSettings": { ar: "إعدادات الدفع", en: "Payment Settings" },
  "page.adminProducts": { ar: "إدارة المنتجات", en: "Manage Products" },
  "page.adminCompanies": { ar: "إدارة الشركات", en: "Manage Companies" },
  "page.adminOffers": { ar: "إدارة العروض", en: "Manage Offers" },
  "page.adminBroadcast": {
    ar: "إرسال الإشعارات",
    en: "Broadcast Notifications"
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
    en: "Are you sure you want to delete this product?"
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
    en: "Are you sure you want to delete this company?"
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
    en: "Are you sure you want to delete this offer?"
  },
  "offer.empty": { ar: "لا توجد عروض بعد", en: "No offers yet" },
  "admin.sendNotif": { ar: "إرسال إشعار", en: "Send Notification" },
  "admin.notifTitle": { ar: "عنوان الإشعار", en: "Notification Title" },
  "admin.notifMessage": {
    ar: "نص الإشعار (إنجليزي)",
    en: "Notification Message (English)"
  },
  "admin.notifMessageAr": {
    ar: "نص الإشعار (عربي)",
    en: "Notification Message (Arabic)"
  },
  "admin.notifSent": {
    ar: "تم إرسال الإشعار بنجاح",
    en: "Notification sent successfully"
  },
  "admin.targetAll": { ar: "جميع المستخدمين", en: "All Users" },
  "admin.paymentMethod": {
    ar: "طريقة الدفع للمستخدم",
    en: "User Payment Method"
  },
  "upload.image": { ar: "صورة المنتج", en: "Product Image" },
  "upload.logo": { ar: "شعار الشركة", en: "Company Logo" },
  "misc.error": { ar: "حدث خطأ", en: "An error occurred" },
  "misc.noResults": { ar: "لا توجد نتائج", en: "No results found" },
  "misc.egp": { ar: "ج.م", en: "EGP" },
  "misc.greeting": { ar: "مرحباً", en: "Hello" }
};
function t(key, lang) {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en ?? key;
}
export {
  Button as B,
  Primitive as P,
  Slot as S,
  composeRefs as a,
  cva as b,
  createLucideIcon as c,
  t,
  useComposedRefs as u
};
