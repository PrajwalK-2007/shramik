import { c as createLucideIcon, u as useGlobalTranslation, b as useAuth, h as useRouter, r as reactExports, j as jsxRuntimeExports, S as ShramikLogo, L as Link, C as Clock, B as Button, i as ue } from "./index-d2ZIbWtv.js";
import { C as Card, a as CardContent } from "./card-BSq67iTX.js";
import { I as Input } from "./input-a85NbTV6.js";
import { L as Label } from "./label-C1APETMy.js";
import { E as EyeOff } from "./eye-off-BTfPF-ax.js";
import { E as Eye } from "./eye-KCp-AYUB.js";
import { W as Wifi } from "./wifi-Cgflyr3j.js";
import { L as LoaderCircle } from "./loader-circle-xO_pNUBT.js";
import { S as ShieldCheck } from "./shield-check-C2yiF5gk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function LoginPage() {
  const { t } = useGlobalTranslation();
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [rememberMe, setRememberMe] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [submitError, setSubmitError] = reactExports.useState("");
  const [pendingApproval, setPendingApproval] = reactExports.useState(false);
  const [connecting, setConnecting] = reactExports.useState(false);
  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = t("common.required");
    else if (!validateEmail(email)) e.email = "Enter a valid email address";
    if (!password.trim()) e.password = t("common.required");
    else if (password.length < 4)
      e.password = "Password must be at least 4 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async (ev) => {
    var _a;
    ev.preventDefault();
    setSubmitError("");
    setPendingApproval(false);
    if (!validate()) return;
    setLoading(true);
    setConnecting(true);
    const result = await auth.loginAsWorker(email, password, rememberMe);
    setConnecting(false);
    if (result.success) {
      ue.success(t("auth.loginSuccess"));
      router.navigate({ to: "/worker/dashboard" });
    } else {
      const isPending = (_a = result.error) == null ? void 0 : _a.toLowerCase().includes("pending");
      if (isPending) setPendingApproval(true);
      setSubmitError(result.error ?? t("auth.invalidCredentials"));
    }
    setLoading(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[85vh] flex items-center justify-center bg-muted/30 py-12 px-4",
      "data-ocid": "login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShramikLogo, { size: "lg", showText: false }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: t("auth.loginAsWorker") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Welcome back to Shramik — Worker Portal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 rounded-lg bg-primary/8 border border-primary/20 px-4 py-3 flex gap-3 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/80 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "New here?" }),
            " ",
            "Register as a worker to start getting hired. Your account will be activated after admin review within 24 hours."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", children: [
                t("auth.email"),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  value: email,
                  onChange: (e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: "" }));
                  },
                  onBlur: () => {
                    if (!email.trim())
                      setErrors((p) => ({ ...p, email: t("common.required") }));
                    else if (!validateEmail(email))
                      setErrors((p) => ({
                        ...p,
                        email: "Enter a valid email address"
                      }));
                  },
                  placeholder: "your@email.com",
                  className: errors.email ? "border-destructive" : "",
                  "data-ocid": "login.email_input"
                }
              ),
              errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "login.email_field_error",
                  children: errors.email
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "password", children: [
                  t("auth.password"),
                  " *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/forgot-password",
                    className: "text-xs text-primary hover:underline",
                    "data-ocid": "login.forgot_password_link",
                    children: "Forgot password?"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "password",
                    type: showPw ? "text" : "password",
                    value: password,
                    onChange: (e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: "" }));
                    },
                    onBlur: () => {
                      if (!password.trim())
                        setErrors((p) => ({
                          ...p,
                          password: t("common.required")
                        }));
                    },
                    placeholder: "••••••",
                    className: errors.password ? "border-destructive pr-10" : "pr-10",
                    "data-ocid": "login.password_input"
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
                  "data-ocid": "login.password_field_error",
                  children: errors.password
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  id: "remember-me",
                  checked: rememberMe,
                  onChange: (e) => setRememberMe(e.target.checked),
                  className: "h-4 w-4 rounded border-border accent-primary cursor-pointer",
                  "data-ocid": "login.remember_me_checkbox"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "remember-me",
                  className: "text-sm text-muted-foreground cursor-pointer select-none",
                  children: "Remember me"
                }
              )
            ] }),
            connecting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-primary/8 border border-primary/20 px-3 py-2.5 flex items-center gap-2",
                "data-ocid": "login.loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4 text-primary animate-pulse flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80", children: "Connecting to server, please wait…" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 text-primary animate-spin ml-auto flex-shrink-0" })
                ]
              }
            ),
            submitError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5",
                "data-ocid": "login.error_state",
                children: [
                  pendingApproval && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-amber-500 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-600", children: "Pending Admin Approval" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: submitError })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                disabled: loading,
                "data-ocid": "login.submit_button",
                children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  " ",
                  connecting ? "Connecting…" : t("common.loading")
                ] }) : t("auth.login")
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              t("auth.noAccount"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/register",
                  className: "text-primary hover:underline font-medium",
                  "data-ocid": "login.register_worker_link",
                  children: t("nav.register")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/admin/login",
                className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-smooth",
                "data-ocid": "login.admin_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
                  t("auth.adminLogin")
                ]
              }
            ) })
          ] })
        ] }) })
      ] })
    }
  );
}
export {
  LoginPage
};
