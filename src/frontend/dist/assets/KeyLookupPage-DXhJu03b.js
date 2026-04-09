import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-B-k-gt5M.js";
import { L as Label, I as Input } from "./label-DQwxhrz7.js";
import { L as Layout, K as Key } from "./Layout-DdUqRl9C.js";
import { e as usePublicKeyInfo } from "./use-keys-hJS0WseV.js";
import { m as motion } from "./proxy-GhEsmpcI.js";
import "./index-tfy2CLD7.js";
import "./backend-YcrI8Id8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function KeyLookupPage() {
  const navigate = useNavigate();
  const [inputId, setInputId] = reactExports.useState("");
  const [searchId, setSearchId] = reactExports.useState(void 0);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const { data: keyInfo, isLoading, isFetched } = usePublicKeyInfo(searchId);
  const handleFind = (e) => {
    e.preventDefault();
    const trimmed = inputId.trim().toUpperCase();
    if (!trimmed) return;
    setSubmitted(false);
    setSearchId(trimmed);
    setSubmitted(true);
  };
  if (submitted && isFetched && keyInfo && searchId) {
    navigate({ to: "/found/$keyId", params: { keyId: searchId } });
  }
  const notFound = submitted && isFetched && !keyInfo && !isLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showNav: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[80vh] gap-6 px-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex flex-col items-center gap-3 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-10 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "KeyRakshak" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-[260px] mx-auto", children: "Enter your Key ID to contact the owner" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.form,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.1 },
        onSubmit: handleFind,
        className: "w-full max-w-sm flex flex-col gap-4",
        "data-ocid": "key-lookup-form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "key-id-input",
                className: "text-sm font-medium text-foreground text-center",
                children: "Key ID"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "key-id-input",
                "data-ocid": "key-id-input",
                placeholder: "KR1001",
                value: inputId,
                onChange: (e) => {
                  setInputId(e.target.value);
                  if (notFound) setSubmitted(false);
                },
                className: "h-14 text-center text-base font-mono tracking-widest uppercase",
                autoComplete: "off",
                autoCapitalize: "characters",
                spellCheck: false
              }
            )
          ] }),
          notFound && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: -4 },
              animate: { opacity: 1, y: 0 },
              className: "text-sm text-destructive text-center",
              "data-ocid": "key-not-found-msg",
              children: "Key ID not found. Please check and try again."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              size: "lg",
              disabled: isLoading || !inputId.trim(),
              "data-ocid": "find-key-btn",
              className: "w-full h-12 gap-2 text-base font-semibold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-5" }),
                isLoading ? "Searching..." : "Find Key"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.3 },
        className: "w-full max-w-sm rounded-xl border border-primary/15 bg-primary/5 p-4 text-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
          "Found a lost key? Enter the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Key ID" }),
          " printed on the tag (e.g. KR1001) to securely contact the owner."
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
      "Powered by",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "KeyRakshak" }),
      " — India's Secure Key Recovery Network"
    ] })
  ] }) });
}
export {
  KeyLookupPage as default
};
