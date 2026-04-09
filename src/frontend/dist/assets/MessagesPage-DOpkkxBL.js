import { b as useInternetIdentity, j as jsxRuntimeExports, S as Skeleton, L as Link } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-B-k-gt5M.js";
import { u as useMessages, K as KEY_TYPE_ICONS, B as Badge } from "./use-messages-BoRV-ayx.js";
import { L as Layout, M as MessageSquare, K as Key } from "./Layout-DdUqRl9C.js";
import { a as useMyKeys } from "./use-keys-hJS0WseV.js";
import { m as motion } from "./proxy-GhEsmpcI.js";
import { C as Calendar } from "./calendar-D1Q7_aSh.js";
import "./backend-YcrI8Id8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short"
  });
}
function formatTime(ts) {
  return new Date(Number(ts) / 1e6).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function MessageItem({ msg, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.05 },
      className: "card-elevated p-4 ml-4",
      "data-ocid": "message-item",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: msg.messageText }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2.5", children: [
          msg.finderPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `tel:${msg.finderPhone}`,
              className: "text-xs text-primary font-medium hover:underline",
              children: [
                "📱 ",
                msg.finderPhone
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(msg.sentAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(msg.sentAt) })
          ] })
        ] })
      ]
    }
  );
}
function KeyMessagesSection({
  keyInfo,
  sectionIndex,
  onCountUpdate
}) {
  const { data: messages, isLoading } = useMessages(keyInfo.id);
  const icon = KEY_TYPE_ICONS[keyInfo.keyType] ?? "🔑";
  if (onCountUpdate) {
    onCountUpdate((messages == null ? void 0 : messages.length) ?? 0, !isLoading);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" });
  }
  if (!messages || messages.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: sectionIndex * 0.08 },
      className: "flex flex-col gap-2",
      "data-ocid": "key-message-group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/keys/$id", params: { id: keyInfo.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground hover:text-primary transition-colors", children: keyInfo.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: keyInfo.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "found", children: messages.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MessageItem, { msg, index: i }, msg.id.toString())) })
      ]
    }
  );
}
function AllKeysMessagesView({ keys }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const q0 = useMessages((_a = keys[0]) == null ? void 0 : _a.id);
  const q1 = useMessages((_b = keys[1]) == null ? void 0 : _b.id);
  const q2 = useMessages((_c = keys[2]) == null ? void 0 : _c.id);
  const q3 = useMessages((_d = keys[3]) == null ? void 0 : _d.id);
  const q4 = useMessages((_e = keys[4]) == null ? void 0 : _e.id);
  const q5 = useMessages((_f = keys[5]) == null ? void 0 : _f.id);
  const q6 = useMessages((_g = keys[6]) == null ? void 0 : _g.id);
  const q7 = useMessages((_h = keys[7]) == null ? void 0 : _h.id);
  const q8 = useMessages((_i = keys[8]) == null ? void 0 : _i.id);
  const q9 = useMessages((_j = keys[9]) == null ? void 0 : _j.id);
  const allQueries = [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9].slice(
    0,
    keys.length
  );
  const allLoaded = allQueries.every((q) => !q.isLoading);
  const totalMessages = allQueries.reduce(
    (sum, q) => {
      var _a2;
      return sum + (((_a2 = q.data) == null ? void 0 : _a2.length) ?? 0);
    },
    0
  );
  const showEmptyFallback = allLoaded && totalMessages === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", "data-ocid": "messages-by-key", children: [
    keys.map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(KeyMessagesSection, { keyInfo: key, sectionIndex: i }, key.id)),
    showEmptyFallback && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.4 },
        "data-ocid": "messages-summary",
        className: "rounded-lg bg-muted/30 border border-border p-5 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "size-8 mx-auto mb-2 text-muted-foreground/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Inbox up to date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            keys.length,
            " ",
            keys.length === 1 ? "key" : "keys",
            " monitored · Messages appear here when someone scans your QR code"
          ] })
        ]
      }
    )
  ] });
}
function MessagesPage() {
  const { identity, login } = useInternetIdentity();
  const { data: keys, isLoading } = useMyKeys();
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sign in to view your messages" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "login-to-messages", children: "Sign In" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Finder Messages" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" }, i)) }) : keys && keys.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AllKeysMessagesView, { keys }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.2 },
        "data-ocid": "empty-messages-state",
        className: "flex flex-col items-center justify-center gap-4 py-16 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-1", children: "No keys registered yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Register a key first to receive messages when someone finds it." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/keys/new", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", "data-ocid": "register-key-from-messages", children: "Register a Key" }) })
        ]
      }
    )
  ] }) });
}
export {
  MessagesPage as default
};
