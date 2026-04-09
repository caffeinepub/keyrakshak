import { b as useInternetIdentity, f as useRouterState, j as jsxRuntimeExports, L as Link, c as cn } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-B-k-gt5M.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = createLucideIcon("key", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const NAV_ITEMS = [
  { to: "/", icon: House, label: "Home", ocid: "nav-home" },
  { to: "/keys/new", icon: Plus, label: "Add Key", ocid: "nav-add-key" },
  {
    to: "/messages",
    icon: MessageSquare,
    label: "Messages",
    ocid: "nav-messages"
  },
  { to: "/keys", icon: Key, label: "My Keys", ocid: "nav-my-keys" },
  { to: "/profile", icon: User, label: "Profile", ocid: "nav-profile" }
];
function Layout({ children, showNav = true, title }) {
  const { identity, login } = useInternetIdentity();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: "sticky top-0 z-40 bg-card border-b border-border shadow-sm",
        "data-ocid": "app-header",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-4 h-14 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/images/logo.png",
              alt: "KeyRakshak",
              className: "h-10 w-auto object-contain"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            showNav && !identity && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick: login,
                "data-ocid": "login-button",
                className: "text-xs",
                children: "Sign In"
              }
            ),
            title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: title })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 max-w-md mx-auto w-full px-4 py-4 pb-24", children }),
    showNav && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        className: "fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border",
        "data-ocid": "bottom-nav",
        "aria-label": "Main navigation",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto flex", children: NAV_ITEMS.map(({ to, icon: Icon, label, ocid }) => {
            const isActive = currentPath === to || to !== "/" && currentPath.startsWith(to);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to,
                className: cn(
                  "flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                ),
                "data-ocid": ocid,
                "aria-label": label,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("size-5", isActive && "stroke-[2.5]") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
                ]
              },
              to
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-safe-area-inset-bottom" })
        ]
      }
    ),
    !showNav && /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-4 text-center bg-muted/40 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ".",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "underline underline-offset-2 hover:text-foreground transition-colors",
          children: "Built with love using caffeine.ai"
        }
      )
    ] }) })
  ] });
}
export {
  Key as K,
  Layout as L,
  MessageSquare as M,
  Plus as P,
  User as U
};
