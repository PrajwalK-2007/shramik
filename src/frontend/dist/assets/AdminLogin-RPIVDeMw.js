import { c as createLucideIcon, u as useGlobalTranslation, b as useAuth, h as useRouter, r as reactExports, j as jsxRuntimeExports, S as ShramikLogo, U as Users, s as ChartColumn, B as Button, L as Link, i as ue } from "./index-D4yy3BhY.js";
import { C as Card, a as CardContent } from "./card-CPR4qmTf.js";
import { I as Input } from "./input-DxOaIX0x.js";
import { L as Label } from "./label-BaD6ci6U.js";
import { L as Lock } from "./lock-D39iL8FC.js";
import { S as ShieldCheck } from "./shield-check-B3gYHK5J.js";
import { E as EyeOff } from "./eye-off-BRmahR_p.js";
import { E as Eye } from "./eye-CXEDHLRe.js";
import { W as Wifi } from "./wifi-Bnf-5XWO.js";
import { L as LoaderCircle } from "./loader-circle-D-_rz6SG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const ADMIN_FEATURES = [
  { icon: Users, label: "Manage all workers & seekers" },
  { icon: CircleCheckBig, label: "Approve / reject registrations" },
  { icon: ChartColumn, label: "View platform analytics" },
  { icon: Lock, label: "Full administrative control" }
];
function AdminLoginPage() {
  const { t } = useGlobalTranslation();
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [connecting, setConnecting] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [submitError, setSubmitError] = reactExports.useState("");
  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = t("common.required");
    else if (!validateEmail(email)) e.email = "Enter a valid email address";
    if (!password.trim()) e.password = t("common.required");
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    setLoading(true);
    setConnecting(true);
    const result = await auth.loginAsAdmin(email, password);
    setConnecting(false);
    if (result.success) {
      ue.success(t("auth.loginSuccess"));
      router.navigate({ to: "/admin/dashboard" });
    } else {
      setSubmitError(result.error ?? t("auth.invalidCredentials"));
    }
    setLoading(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[85vh] flex items-center justify-center py-12 px-4",
      "data-ocid": "admin_login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex flex-col bg-card border border-border rounded-2xl p-8 h-full justify-between shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShramikLogo, { size: "lg", showText: true }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-2", children: "Shramik Admin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: "Central command for managing the Shramik platform. Verify workers, monitor activity, and keep the community safe." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ADMIN_FEATURES.map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: label })
            ] }, label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pt-6 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1", children: "Admin Credentials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email: shramik@gmail.com" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Authorized personnel only." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-7 h-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: t("auth.adminLogin") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Shramik Administration Portal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "admin-email", children: [
                  t("auth.email"),
                  " *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "admin-email",
                    type: "email",
                    value: email,
                    onChange: (e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                    },
                    onBlur: () => {
                      if (!email.trim())
                        setErrors((p) => ({
                          ...p,
                          email: t("common.required")
                        }));
                      else if (!validateEmail(email))
                        setErrors((p) => ({
                          ...p,
                          email: "Enter a valid email address"
                        }));
                    },
                    placeholder: "shramik@gmail.com",
                    className: errors.email ? "border-destructive" : "",
                    autoComplete: "username",
                    "data-ocid": "admin_login.email_input"
                  }
                ),
                errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "admin_login.email_field_error",
                    children: errors.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "admin-password", children: [
                  t("auth.password"),
                  " *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "admin-password",
                      type: showPw ? "text" : "password",
                      value: password,
                      onChange: (e) => {
                        setPassword(e.target.value);
                        if (errors.password)
                          setErrors((p) => ({ ...p, password: "" }));
                      },
                      onBlur: () => {
                        if (!password.trim())
                          setErrors((p) => ({
                            ...p,
                            password: t("common.required")
                          }));
                      },
                      placeholder: "••••••••",
                      className: errors.password ? "border-destructive pr-10" : "pr-10",
                      autoComplete: "current-password",
                      "data-ocid": "admin_login.password_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPw(!showPw),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                      "aria-label": showPw ? "Hide password" : "Show password",
                      children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "admin_login.password_field_error",
                    children: errors.password
                  }
                )
              ] }),
              connecting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg bg-primary/8 border border-primary/20 px-3 py-2.5 flex items-center gap-2",
                  "data-ocid": "admin_login.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4 text-primary animate-pulse flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80", children: "Connecting to server, please wait…" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 text-primary animate-spin ml-auto flex-shrink-0" })
                  ]
                }
              ),
              submitError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5",
                  "data-ocid": "admin_login.error_state",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: submitError })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  disabled: loading,
                  "data-ocid": "admin_login.submit_button",
                  children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    connecting ? "Connecting…" : "Authenticating…"
                  ] }) : "Login to Admin Panel"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 pt-4 border-t border-border text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/login",
                className: "text-sm text-muted-foreground hover:text-primary transition-smooth",
                "data-ocid": "admin_login.back_link",
                children: "← Back to Worker Login"
              }
            ) })
          ] }) })
        ] })
      ] })
    }
  );
}
export {
  AdminLoginPage
};
