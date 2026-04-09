import { b as useInternetIdentity, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, c as cn, a as ue } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-B-k-gt5M.js";
import { L as Label, I as Input } from "./label-DQwxhrz7.js";
import { L as Layout } from "./Layout-DdUqRl9C.js";
import { b as useAddKey, c as useRegisterOwner, d as useSetKeyReward } from "./use-keys-hJS0WseV.js";
import { K as KeyType } from "./backend-YcrI8Id8.js";
import { A as ArrowLeft } from "./arrow-left-D0y7qeRS.js";
import { I as IndianRupee } from "./indian-rupee-e58mJqGH.js";
import "./index-tfy2CLD7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$1);
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
const KEY_TYPES = [
  { value: KeyType.Car, label: "Car Keys", emoji: "🚗" },
  { value: KeyType.Bike, label: "Bike Keys", emoji: "🏍️" },
  { value: KeyType.Home, label: "Home Keys", emoji: "🏠" },
  { value: KeyType.Office, label: "Office Keys", emoji: "🏢" }
];
function AddKeyPage() {
  const { identity, login } = useInternetIdentity();
  const navigate = useNavigate();
  const addKey = useAddKey();
  const registerOwner = useRegisterOwner();
  const setKeyReward = useSetKeyReward();
  const [ownerName, setOwnerName] = reactExports.useState("");
  const [mobile, setMobile] = reactExports.useState("");
  const [keyName, setKeyName] = reactExports.useState("");
  const [keyType, setKeyType] = reactExports.useState(KeyType.Home);
  const [rewardAmount, setRewardAmount] = reactExports.useState("");
  const [upiId, setUpiId] = reactExports.useState("");
  const [showReward, setShowReward] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sign in to add a key" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "login-to-add", children: "Sign In" })
    ] }) });
  }
  const validate = () => {
    const newErrors = {};
    if (!ownerName.trim()) newErrors.ownerName = "Enter your name";
    if (!mobile.trim()) newErrors.mobile = "Enter your mobile number";
    else if (!/^[+0-9\s-]{8,15}$/.test(mobile.trim()))
      newErrors.mobile = "Enter a valid mobile number";
    if (!keyName.trim()) newErrors.keyName = "Enter a name for this key";
    if (showReward && rewardAmount) {
      const amt = Number(rewardAmount);
      if (Number.isNaN(amt) || amt < 0)
        newErrors.rewardAmount = "Enter a valid reward amount";
    }
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await registerOwner.mutateAsync({
        name: ownerName.trim(),
        mobile: mobile.trim()
      });
      const keyId = await addKey.mutateAsync({
        name: keyName.trim(),
        keyType
      });
      const amt = Number(rewardAmount);
      if (showReward && amt > 0 && upiId.trim()) {
        await setKeyReward.mutateAsync({
          keyId,
          rewardAmount: amt,
          upiId: upiId.trim()
        });
      }
      ue.success(`Key "${keyName}" activated as ${keyId} 🎉`);
      navigate({ to: "/keys/$id", params: { id: keyId } });
    } catch {
      ue.error("Failed to add key. Please try again.");
    }
  };
  const isSubmitting = addKey.isPending || registerOwner.isPending || setKeyReward.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Go back", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Add New Key" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "flex flex-col gap-5",
        noValidate: true,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Your Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "owner-name", className: "text-sm font-medium", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "owner-name",
                  "data-ocid": "owner-name-input",
                  placeholder: "e.g. Rahul Sharma",
                  value: ownerName,
                  onChange: (e) => {
                    setOwnerName(e.target.value);
                    if (e.target.value.trim())
                      setErrors((prev) => ({ ...prev, ownerName: "" }));
                  },
                  onBlur: () => {
                    if (!ownerName.trim())
                      setErrors((prev) => ({
                        ...prev,
                        ownerName: "Enter your name"
                      }));
                  },
                  "aria-invalid": !!errors.ownerName,
                  "aria-describedby": errors.ownerName ? "owner-name-error" : void 0,
                  className: "h-12"
                }
              ),
              errors.ownerName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "owner-name-error", className: "text-xs text-destructive", children: errors.ownerName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "owner-mobile", className: "text-sm font-medium", children: "Mobile Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "owner-mobile",
                  "data-ocid": "owner-mobile-input",
                  type: "tel",
                  placeholder: "+91 98765 43210",
                  value: mobile,
                  onChange: (e) => {
                    setMobile(e.target.value);
                    if (e.target.value.trim())
                      setErrors((prev) => ({ ...prev, mobile: "" }));
                  },
                  onBlur: () => {
                    if (!mobile.trim())
                      setErrors((prev) => ({
                        ...prev,
                        mobile: "Enter your mobile number"
                      }));
                  },
                  "aria-invalid": !!errors.mobile,
                  "aria-describedby": errors.mobile ? "mobile-error" : void 0,
                  className: "h-12"
                }
              ),
              errors.mobile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "mobile-error", className: "text-xs text-destructive", children: errors.mobile }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "size-3 text-muted-foreground shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your number is never shown to finders. Used only for owner verification." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Key Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "key-name", className: "text-sm font-medium", children: "Key Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "key-name",
                  "data-ocid": "key-name-input",
                  placeholder: "e.g. My Home Keys, Office Spare...",
                  value: keyName,
                  onChange: (e) => {
                    setKeyName(e.target.value);
                    if (e.target.value.trim())
                      setErrors((prev) => ({ ...prev, keyName: "" }));
                  },
                  onBlur: () => {
                    if (!keyName.trim())
                      setErrors((prev) => ({
                        ...prev,
                        keyName: "Enter a name for this key"
                      }));
                  },
                  "aria-invalid": !!errors.keyName,
                  "aria-describedby": errors.keyName ? "key-name-error" : void 0,
                  className: "h-12"
                }
              ),
              errors.keyName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "key-name-error", className: "text-xs text-destructive", children: errors.keyName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Key Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: KEY_TYPES.map(({ value, label, emoji }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `key-type-${value.toLowerCase()}`,
                  onClick: () => setKeyType(value),
                  "aria-pressed": keyType === value,
                  className: cn(
                    "flex items-center gap-2 p-3 rounded-lg border-2 text-left transition-smooth",
                    keyType === value ? "border-primary bg-primary/5 text-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: label })
                  ]
                },
                value
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowReward((v) => !v),
                "data-ocid": "toggle-reward-section",
                className: "flex items-center justify-between w-full rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-left transition-smooth hover:bg-muted/50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "size-4 text-accent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                      "Reward Setup",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground ml-1", children: "(Optional)" })
                    ] })
                  ] }),
                  showReward ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4 text-muted-foreground" })
                ]
              }
            ),
            showReward && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-lg border border-accent/20 bg-accent/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "🎁 Set a reward to encourage finders to return your key faster." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "reward-amount",
                    className: "text-sm font-medium",
                    children: "Reward Amount (₹)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "reward-amount",
                    "data-ocid": "reward-amount-input",
                    type: "number",
                    min: 0,
                    placeholder: "e.g. 200",
                    value: rewardAmount,
                    onChange: (e) => {
                      setRewardAmount(e.target.value);
                      setErrors((prev) => ({ ...prev, rewardAmount: "" }));
                    },
                    "aria-invalid": !!errors.rewardAmount,
                    className: "h-12"
                  }
                ),
                errors.rewardAmount && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.rewardAmount })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "upi-id", className: "text-sm font-medium", children: "UPI ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "upi-id",
                    "data-ocid": "upi-id-input",
                    placeholder: "yourname@upi",
                    value: upiId,
                    onChange: (e) => setUpiId(e.target.value),
                    className: "h-12"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Finder will pay reward directly to your UPI — Google Pay / PhonePe." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/5 border border-primary/20 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium mb-1", children: "🔑 How it works" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "After adding your key, you'll get a unique QR code (e.g. KR1001). Stick it on your keychain. If someone finds your key and scans the code, they can message you — your phone number stays 100% private." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              size: "lg",
              disabled: isSubmitting,
              "data-ocid": "submit-add-key",
              className: "w-full h-12 text-base font-semibold",
              children: isSubmitting ? "Activating QR Key..." : "✓ Activate QR Key"
            }
          )
        ]
      }
    )
  ] }) });
}
export {
  AddKeyPage as default
};
