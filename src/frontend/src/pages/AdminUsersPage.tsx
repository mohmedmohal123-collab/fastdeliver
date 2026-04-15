import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Search, UserCheck, UserX, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { AdminProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useLangStore } from "../store/lang";
import type { User } from "../types";

const USERS: User[] = [
  {
    id: 1,
    email: "ahmed.hassan@gmail.com",
    name: "أحمد حسن",
    phone: "01012345678",
    isActive: true,
    createdAt: Date.now() - 86400000 * 30,
  },
  {
    id: 2,
    email: "sara.ali@hotmail.com",
    name: "سارة علي",
    phone: "01123456789",
    isActive: true,
    createdAt: Date.now() - 86400000 * 15,
  },
  {
    id: 3,
    email: "omar.ibrahim@yahoo.com",
    name: "عمر إبراهيم",
    phone: "01234567890",
    isActive: false,
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: 4,
    email: "nour.khaled@gmail.com",
    name: "نور خالد",
    phone: "01512345678",
    isActive: true,
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 5,
    email: "hassan.mostafa@gmail.com",
    name: "حسن مصطفى",
    phone: "01612345678",
    isActive: true,
    createdAt: Date.now() - 86400000,
  },
];

export default function AdminUsersPage() {
  const { lang } = useLangStore();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(USERS);

  const filtered = users.filter(
    (u) =>
      !search ||
      u.name.includes(search) ||
      u.email.includes(search) ||
      u.phone.includes(search),
  );

  function toggleActive(id: number) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)),
    );
    toast.success(
      lang === "ar" ? "تم تحديث حالة المستخدم" : "User status updated",
    );
  }

  return (
    <AdminProtectedRoute>
      <Layout variant="admin">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="font-display font-bold text-xl text-foreground">
              {t("page.adminUsers", lang)}
            </h1>
            <Badge className="bg-primary/15 text-primary border-primary/30 border">
              <Users className="w-3 h-3 mr-1" />
              {users.length} {lang === "ar" ? "مستخدم" : "users"}
            </Badge>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("nav.search", lang)}
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="admin_users.search_input"
            />
          </div>

          <div className="space-y-3">
            {filtered.map((user, i) => {
              const initials = user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              return (
                <Card
                  key={user.id}
                  className="card-elevated"
                  data-ocid={`admin_users.user.item.${i + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarFallback className="text-xs font-bold bg-secondary/30 text-secondary-foreground">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm text-foreground">
                            {user.name}
                          </p>
                          <Badge
                            className={`text-[10px] px-1.5 py-0 border ${user.isActive ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-muted/30 text-muted-foreground border-border"}`}
                          >
                            {user.isActive
                              ? lang === "ar"
                                ? "نشط"
                                : "Active"
                              : lang === "ar"
                                ? "موقوف"
                                : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            {user.phone}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleActive(user.id)}
                        className={
                          user.isActive
                            ? "text-destructive hover:bg-destructive/10"
                            : "text-green-400 hover:bg-green-400/10"
                        }
                        data-ocid={`admin_users.toggle_active.button.${i + 1}`}
                      >
                        {user.isActive ? (
                          <>
                            <UserX className="w-3.5 h-3.5 mr-1" />
                            {lang === "ar" ? "إيقاف" : "Deactivate"}
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3.5 h-3.5 mr-1" />
                            {lang === "ar" ? "تفعيل" : "Activate"}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </Layout>
    </AdminProtectedRoute>
  );
}
