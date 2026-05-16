import { j as jsxRuntimeExports, L as Link, B as Button } from "./index-d2ZIbWtv.js";
import { C as Card, a as CardContent } from "./card-BSq67iTX.js";
import { L as Lock } from "./lock-DofHP7H7.js";
import { A as ArrowLeft } from "./arrow-left-CsBjrm6V.js";
function ForgotPasswordPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[85vh] flex items-center justify-center bg-muted/30 py-12 px-4",
      "data-ocid": "forgot_password.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: "Forgot Password?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm max-w-xs mx-auto", children: "Password reset is coming soon. Please contact the admin for help with your account." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/60 border border-border px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "For account recovery, please reach out to the platform admin at",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "mailto:shramik@gmail.com",
                className: "text-primary hover:underline font-medium",
                children: "shramik@gmail.com"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "w-full gap-2",
              "data-ocid": "forgot_password.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to Login"
              ]
            }
          ) })
        ] }) })
      ] })
    }
  );
}
export {
  ForgotPasswordPage
};
