import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  CreditCard,
  Loader2,
  RefreshCw,
  Smartphone,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { t } from "../i18n";
import { useLangStore } from "../store/lang";
import type { PaymentMethod, PaymentPublic } from "../types";

type ModalState = "idle" | "loading" | "success" | "failed";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  method: PaymentMethod;
  amount: number;
  orderId: bigint;
  onInitiatePayment: (
    method: PaymentMethod,
    phoneNumber: string | null,
    cardData?: { number: string; expiry: string; cvv: string },
  ) => Promise<{ ok?: PaymentPublic; err?: string }>;
}

const METHOD_CONFIG: Record<
  PaymentMethod,
  { color: string; bgColor: string; borderColor: string; icon: React.ReactNode }
> = {
  VodafoneCash: {
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: <Smartphone className="w-5 h-5" />,
  },
  InstaPay: {
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: <Wallet className="w-5 h-5" />,
  },
  BankVisa: {
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    icon: <CreditCard className="w-5 h-5" />,
  },
  CashOnDelivery: {
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    icon: <Banknote className="w-5 h-5" />,
  },
};

function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export function PaymentModal({
  open,
  onClose,
  method,
  amount,
  onInitiatePayment,
}: PaymentModalProps) {
  const { lang } = useLangStore();
  const [state, setState] = useState<ModalState>("idle");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [payment, setPayment] = useState<PaymentPublic | null>(null);

  const config = METHOD_CONFIG[method];
  const dir = lang === "ar" ? "rtl" : "ltr";

  function resetForm() {
    setState("idle");
    setPhone("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setErrorMsg("");
    setPayment(null);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function handleSubmit() {
    setState("loading");
    setErrorMsg("");

    const phoneArg =
      method === "VodafoneCash" || method === "InstaPay" ? phone || null : null;
    const cardData =
      method === "BankVisa" ? { number: cardNumber, expiry, cvv } : undefined;

    try {
      const result = await onInitiatePayment(method, phoneArg, cardData);
      if (result.ok) {
        setPayment(result.ok);
        setState("success");
      } else {
        setErrorMsg(
          result.err ??
            (lang === "ar"
              ? "حدث خطأ غير متوقع"
              : "An unexpected error occurred"),
        );
        setState("failed");
      }
    } catch {
      setErrorMsg(
        lang === "ar" ? "فشل الاتصال بالخادم" : "Connection to server failed",
      );
      setState("failed");
    }
  }

  const canSubmit =
    state === "idle" &&
    (method === "CashOnDelivery" ||
      (method === "BankVisa" &&
        cardNumber.replace(/\s/g, "").length === 16 &&
        expiry.length === 5 &&
        cvv.length >= 3) ||
      ((method === "VodafoneCash" || method === "InstaPay") &&
        phone.length >= 10));

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogContent
        className="max-w-sm border border-border bg-card"
        dir={dir}
        data-ocid="payment.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <span className={`${config.color}`}>{config.icon}</span>
            {t(`payment.${method}`, lang)}
          </DialogTitle>
        </DialogHeader>

        {/* Amount badge */}
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor} border ${config.borderColor}`}
        >
          <span className="text-sm text-muted-foreground">
            {t("payment.amount", lang)}
          </span>
          <span
            className={`font-display font-bold text-lg ms-auto ${config.color}`}
          >
            {amount} {t("misc.egp", lang)}
          </span>
        </div>

        {/* State: idle → show form */}
        {state === "idle" && (
          <div className="space-y-4">
            {/* Vodafone Cash */}
            {method === "VodafoneCash" && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t("payment.vodafoneInstructions", lang)}
                </p>
                <div className="space-y-1.5">
                  <Label className="text-sm">
                    {t("payment.phoneNumber", lang)}
                  </Label>
                  <div className="relative">
                    <Smartphone className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                    <Input
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
                      }
                      placeholder="01xxxxxxxxx"
                      className="ps-9 border-red-500/30 focus:border-red-500/60"
                      data-ocid="payment.phone.input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* InstaPay */}
            {method === "InstaPay" && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t("payment.instaPayInstructions", lang)}
                </p>
                {/* QR Code placeholder */}
                <div className="flex justify-center py-2">
                  <div className="w-28 h-28 rounded-xl bg-muted/30 border border-blue-500/20 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-1 p-2 opacity-50">
                      {(
                        [
                          "tl",
                          "tm",
                          "tr",
                          "ml",
                          "mm",
                          "mr",
                          "bl",
                          "bm",
                          "br",
                        ] as const
                      ).map((cell) => (
                        <div
                          key={cell}
                          className={`w-5 h-5 rounded-sm ${["tl", "tr", "mm", "bl", "br"].includes(cell) ? "bg-blue-400" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">
                    {t("payment.phoneNumber", lang)}
                  </Label>
                  <div className="relative">
                    <Wallet className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                    <Input
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
                      }
                      placeholder="01xxxxxxxxx"
                      className="ps-9 border-blue-500/30 focus:border-blue-500/60"
                      data-ocid="payment.instapay-phone.input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank Visa */}
            {method === "BankVisa" && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t("payment.cardInstructions", lang)}
                </p>
                {/* Card visual */}
                <div className="relative h-36 rounded-2xl bg-gradient-to-br from-indigo-900/80 via-indigo-800/60 to-indigo-700/40 border border-indigo-500/30 p-4 overflow-hidden">
                  <div className="absolute top-3 end-4 opacity-30">
                    <div className="flex gap-1">
                      <div className="w-7 h-5 rounded-full bg-amber-400" />
                      <div className="w-7 h-5 rounded-full bg-red-500 -ms-3 opacity-80" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 start-4 end-4">
                    <p className="font-mono text-indigo-200/90 text-base tracking-widest">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-indigo-300/60">
                        {expiry || "MM/YY"}
                      </span>
                      <span className="text-xs text-indigo-300/60">
                        {cvv ? "•••" : "CVV"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      {t("payment.cardNumber", lang)}
                    </Label>
                    <div className="relative">
                      <CreditCard className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                      <Input
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        placeholder="1234 5678 9012 3456"
                        className="ps-9 font-mono border-indigo-500/30 focus:border-indigo-500/60"
                        data-ocid="payment.card-number.input"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-sm">
                        {t("payment.expiry", lang)}
                      </Label>
                      <Input
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(formatExpiry(e.target.value))
                        }
                        placeholder="MM/YY"
                        className="font-mono border-indigo-500/30 focus:border-indigo-500/60"
                        data-ocid="payment.expiry.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm">
                        {t("payment.cvv", lang)}
                      </Label>
                      <Input
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                        placeholder="•••"
                        type="password"
                        className="font-mono border-indigo-500/30 focus:border-indigo-500/60"
                        data-ocid="payment.cvv.input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cash on Delivery */}
            {method === "CashOnDelivery" && (
              <div className="space-y-3">
                <div className="flex justify-center py-3">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <Banknote className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {t("payment.cashInstructions", lang)}
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                data-ocid="payment.cancel_button"
              >
                {t("btn.cancel", lang)}
              </Button>
              <Button
                className="flex-1 gradient-primary text-primary-foreground font-medium"
                onClick={handleSubmit}
                disabled={!canSubmit}
                data-ocid="payment.confirm_button"
              >
                {t("payment.confirmPayment", lang)}
              </Button>
            </div>
          </div>
        )}

        {/* State: loading */}
        {state === "loading" && (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
            <p className="text-sm text-muted-foreground">
              {t("payment.processing", lang)}
            </p>
          </div>
        )}

        {/* State: success */}
        {state === "success" && (
          <div
            className="flex flex-col items-center gap-4 py-4"
            data-ocid="payment.success_state"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center animate-in zoom-in duration-300">
              <CheckCircle2 className="w-9 h-9 text-green-400" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold text-foreground">
                {t("payment.success", lang)}
              </p>
              {payment?.transactionId && (
                <p className="text-xs text-muted-foreground">
                  {t("payment.transactionId", lang)}: {payment.transactionId}
                </p>
              )}
            </div>
            <Badge className="bg-green-500/15 text-green-400 border-green-500/30">
              {amount} {t("misc.egp", lang)}
            </Badge>
            <Button
              className="w-full"
              onClick={handleClose}
              data-ocid="payment.close_button"
            >
              {t("payment.close", lang)}
            </Button>
          </div>
        )}

        {/* State: failed */}
        {state === "failed" && (
          <div
            className="flex flex-col items-center gap-4 py-4"
            data-ocid="payment.error_state"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center animate-in zoom-in duration-300">
              <AlertCircle className="w-9 h-9 text-destructive" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold text-foreground">
                {t("payment.failed", lang)}
              </p>
              {errorMsg && (
                <p className="text-xs text-muted-foreground">{errorMsg}</p>
              )}
            </div>
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                data-ocid="payment.close_button"
              >
                <X className="w-4 h-4 me-1" />
                {t("payment.close", lang)}
              </Button>
              <Button
                className="flex-1 gradient-primary text-primary-foreground"
                onClick={() => setState("idle")}
                data-ocid="payment.retry_button"
              >
                <RefreshCw className="w-4 h-4 me-1" />
                {t("payment.retry", lang)}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
