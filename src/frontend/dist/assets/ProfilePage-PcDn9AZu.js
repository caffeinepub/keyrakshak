import { b as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, S as Skeleton, a as ue } from "./index-C_OiGXDq.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-B-k-gt5M.js";
import { L as Label, I as Input } from "./label-DQwxhrz7.js";
import { S as Separator } from "./separator-CWI6jSIb.js";
import { L as Layout, U as User, K as Key } from "./Layout-DdUqRl9C.js";
import { a as useMyKeys, c as useRegisterOwner } from "./use-keys-hJS0WseV.js";
import { m as motion } from "./proxy-GhEsmpcI.js";
import { C as CircleCheck } from "./circle-check-DrziEcCd.js";
import "./index-tfy2CLD7.js";
import "./backend-YcrI8Id8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const PROFILE_STORAGE_KEY = "keyrakshak_owner_profile";
function loadStoredProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { name: "", mobile: "" };
}
function saveStoredProfile(name, mobile) {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ name, mobile }));
  } catch {
  }
}
function maskMobile(mobile) {
  const cleaned = mobile.replace(/\s+/g, "");
  if (cleaned.length < 6) return mobile;
  return `${cleaned.slice(0, 3)}••••${cleaned.slice(-3)}`;
}
function ProfilePage() {
  const { identity, login, clear } = useInternetIdentity();
  const { data: keys, isLoading } = useMyKeys();
  const registerOwner = useRegisterOwner();
  const [name, setName] = reactExports.useState("");
  const [mobile, setMobile] = reactExports.useState("");
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [savedName, setSavedName] = reactExports.useState("");
  const [savedMobile, setSavedMobile] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    const stored = loadStoredProfile();
    if (stored.name) {
      setSavedName(stored.name);
      setSavedMobile(stored.mobile);
    }
  }, []);
  reactExports.useEffect(() => {
    if (!savedName && keys && keys.length > 0) {
      const stored = loadStoredProfile();
      if (!stored.name) ;
    }
  }, [keys, savedName]);
  const isRegistered = !!savedName && !!savedMobile;
  const lostCount = (keys == null ? void 0 : keys.filter((k) => k.lostMode).length) ?? 0;
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Your Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Sign in to manage your account" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "login-profile", children: "Sign In" })
    ] }) });
  }
  const principalStr = identity.getPrincipal().toText();
  const shortPrincipal = `${principalStr.slice(0, 5)}...${principalStr.slice(-4)}`;
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Enter your name";
    if (!mobile.trim()) newErrors.mobile = "Enter your mobile number";
    else if (!/^[+0-9\s-]{8,15}$/.test(mobile.trim()))
      newErrors.mobile = "Enter a valid mobile number";
    return newErrors;
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await registerOwner.mutateAsync({
        name: name.trim(),
        mobile: mobile.trim()
      });
      const trimmedName = name.trim();
      const trimmedMobile = mobile.trim();
      setSavedName(trimmedName);
      setSavedMobile(trimmedMobile);
      saveStoredProfile(trimmedName, trimmedMobile);
      setIsEditing(false);
      setErrors({});
      ue.success("Profile updated successfully!");
    } catch {
      ue.error("Failed to update profile. Please try again.");
    }
  };
  const handleStartEdit = () => {
    setName(savedName);
    setMobile(savedMobile);
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrors({});
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Profile" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: "card-elevated p-4 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Internet Identity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-mono text-sm font-semibold text-foreground truncate",
                title: principalStr,
                children: shortPrincipal
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-primary bg-primary/8 px-2 py-1 rounded-full border border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Verified" })
          ] })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.05 },
        className: "grid grid-cols-2 gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-elevated p-4 text-center",
              "data-ocid": "stat-total-keys",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: (keys == null ? void 0 : keys.length) ?? 0 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Registered Keys" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-elevated p-4 text-center",
              "data-ocid": "stat-lost-mode",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-lg", children: "🚨" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: lostCount }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Lost Mode Active" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.1 },
        className: "card-elevated p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Your Details" }),
            isRegistered && !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleStartEdit,
                "data-ocid": "edit-profile-btn",
                className: "flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3" }),
                  "Edit"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4 leading-relaxed bg-muted/40 rounded-md px-3 py-2 border border-border", children: [
            "🔒",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Your phone number is never shown to finders." }),
            " ",
            "It's only used for owner verification and secure key recovery."
          ] }),
          isRegistered && !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", "data-ocid": "profile-display", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: savedName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mobile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground font-mono", children: maskMobile(savedMobile) })
            ] })
          ] }) : (
            /* Form — first time or editing */
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSave,
                className: "flex flex-col gap-3",
                noValidate: true,
                "data-ocid": "profile-form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", className: "text-sm", children: "Full Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "profile-name",
                        "data-ocid": "owner-name-input",
                        placeholder: "Your name",
                        value: name,
                        onChange: (e) => {
                          setName(e.target.value);
                          if (e.target.value.trim())
                            setErrors((prev) => ({ ...prev, name: "" }));
                        },
                        onBlur: () => {
                          if (!name.trim())
                            setErrors((prev) => ({
                              ...prev,
                              name: "Enter your name"
                            }));
                        },
                        "aria-invalid": !!errors.name,
                        "aria-describedby": errors.name ? "name-error" : void 0,
                        className: "h-11"
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "name-error", className: "text-xs text-destructive", children: errors.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-mobile", className: "text-sm", children: "Mobile Number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "profile-mobile",
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
                        className: "h-11"
                      }
                    ),
                    errors.mobile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "mobile-error", className: "text-xs text-destructive", children: errors.mobile })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        onClick: handleCancelEdit,
                        className: "flex-1",
                        "data-ocid": "cancel-edit-btn",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        disabled: registerOwner.isPending,
                        "data-ocid": "register-owner-btn",
                        className: isEditing ? "flex-1" : "w-full",
                        children: registerOwner.isPending ? "Saving..." : isEditing ? "Update Details" : "Save Details"
                      }
                    )
                  ] })
                ]
              }
            )
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        onClick: clear,
        "data-ocid": "sign-out-btn",
        className: "w-full text-destructive border-destructive/30 hover:bg-destructive/5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4 mr-2" }),
          "Sign Out"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground py-2", children: [
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
    ] })
  ] }) });
}
export {
  ProfilePage as default
};
