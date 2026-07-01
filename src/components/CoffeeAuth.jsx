// import { useState, useCallback } from "react";
// import {
//   Eye,
//   EyeOff,
//   Coffee,
//   Mail,
//   Lock,
//   User,
//   ArrowRight,
//   CheckCircle2,
//   Loader2,
//   AlertCircle,
//   Check,
// } from "lucide-react";

// // ─── Design Tokens ───────────────────────────────────────────────────────────
// const C = {
//   primary: "#3B2A24",
//   primaryHov: "#2A1D19",
//   secondary: "#C9A27E",
//   accent: "#D97706",
//   bg: "#FAF7F2",
//   surface: "#FFFFFF",
//   border: "#E7E2DA",
//   textPri: "#1C1917",
//   textSec: "#6B7280",
//   success: "#22C55E",
//   error: "#EF4444",
// };

// // ─── Password Strength ────────────────────────────────────────────────────────
// function getStrength(pw) {
//   let score = 0;
//   if (!pw) return { score: 0, label: "", color: "" };
//   if (pw.length >= 8) score++;
//   if (pw.length >= 12) score++;
//   if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
//   if (/\d/.test(pw)) score++;
//   if (/[^A-Za-z0-9]/.test(pw)) score++;
//   if (score <= 1) return { score: 1, label: "Weak", color: C.error };
//   if (score <= 2) return { score: 2, label: "Fair", color: C.accent };
//   if (score <= 3) return { score: 3, label: "Good", color: "#EAB308" };
//   return { score: 4, label: "Strong", color: C.success };
// }

// // ─── Reusable Input ───────────────────────────────────────────────────────────
// function Input({
//   label,
//   id,
//   type = "text",
//   icon: Icon,
//   error,
//   rightEl,
//   ...rest
// }) {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//       <label
//         htmlFor={id}
//         style={{
//           fontSize: 13,
//           fontWeight: 600,
//           color: C.textPri,
//           letterSpacing: "0.01em",
//         }}
//       >
//         {label}
//       </label>
//       <div style={{ position: "relative" }}>
//         {Icon && (
//           <span
//             style={{
//               position: "absolute",
//               left: 14,
//               top: "50%",
//               transform: "translateY(-50%)",
//               color: error ? C.error : C.textSec,
//               display: "flex",
//               pointerEvents: "none",
//               transition: "color 0.2s",
//             }}
//           >
//             <Icon size={16} />
//           </span>
//         )}
//         <input
//           id={id}
//           type={type}
//           {...rest}
//           style={{
//             width: "100%",
//             boxSizing: "border-box",
//             padding: Icon ? "12px 44px 12px 42px" : "12px 44px 12px 14px",
//             paddingRight: rightEl ? 48 : 14,
//             background: C.surface,
//             border: `1.5px solid ${error ? C.error : C.border}`,
//             borderRadius: 14,
//             fontSize: 14,
//             color: C.textPri,
//             outline: "none",
//             transition: "border-color 0.2s, box-shadow 0.2s",
//             fontFamily: "inherit",
//             boxShadow: error ? `0 0 0 3px ${C.error}18` : "none",
//           }}
//           onFocus={(e) => {
//             e.target.style.borderColor = error ? C.error : C.primary;
//             e.target.style.boxShadow = `0 0 0 3px ${error ? C.error : C.primary}18`;
//           }}
//           onBlur={(e) => {
//             e.target.style.borderColor = error ? C.error : C.border;
//             e.target.style.boxShadow = error
//               ? `0 0 0 3px ${C.error}18`
//               : "none";
//           }}
//         />
//         {rightEl && (
//           <span
//             style={{
//               position: "absolute",
//               right: 14,
//               top: "50%",
//               transform: "translateY(-50%)",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             {rightEl}
//           </span>
//         )}
//       </div>
//       {error && (
//         <span
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 4,
//             fontSize: 12,
//             color: C.error,
//           }}
//         >
//           <AlertCircle size={12} /> {error}
//         </span>
//       )}
//     </div>
//   );
// }

// // ─── Reusable Button ──────────────────────────────────────────────────────────
// function Button({
//   children,
//   loading,
//   success,
//   variant = "primary",
//   style: ext,
//   ...rest
// }) {
//   const base = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     width: "100%",
//     padding: "13px 24px",
//     border: "none",
//     borderRadius: 14,
//     fontSize: 15,
//     fontWeight: 700,
//     cursor: loading || rest.disabled ? "not-allowed" : "pointer",
//     transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
//     fontFamily: "inherit",
//     letterSpacing: "0.01em",
//     ...ext,
//   };
//   const styles =
//     variant === "primary"
//       ? {
//           ...base,
//           background: success ? C.success : C.primary,
//           color: "#FFF",
//           opacity: loading || rest.disabled ? 0.7 : 1,
//           boxShadow:
//             loading || rest.disabled ? "none" : `0 4px 16px ${C.primary}30`,
//         }
//       : {
//           ...base,
//           background: "transparent",
//           color: C.primary,
//           border: `1.5px solid ${C.border}`,
//         };

//   return (
//     <button
//       {...rest}
//       style={styles}
//       onMouseEnter={(e) => {
//         if (!loading && !rest.disabled && !success && variant === "primary")
//           e.currentTarget.style.background = C.primaryHov;
//         if (variant === "ghost") e.currentTarget.style.borderColor = C.primary;
//       }}
//       onMouseLeave={(e) => {
//         if (variant === "primary")
//           e.currentTarget.style.background = success ? C.success : C.primary;
//         if (variant === "ghost") e.currentTarget.style.borderColor = C.border;
//       }}
//     >
//       {loading ? (
//         <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
//       ) : success ? (
//         <>
//           <CheckCircle2 size={18} /> {children}
//         </>
//       ) : (
//         children
//       )}
//     </button>
//   );
// }

// // ─── Coffee Illustration Panel ────────────────────────────────────────────────
// function IllustrationPanel({ mode }) {
//   const quotes = {
//     login: { h: "Welcome back.", sub: "Your next great cup is waiting." },
//     register: {
//       h: "Start your journey.",
//       sub: "Discover single-origin coffees from around the world.",
//     },
//   };
//   const q = quotes[mode];
//   return (
//     <div
//       style={{
//         background: `linear-gradient(160deg, ${C.primary} 0%, #1A0F0C 100%)`,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "48px 40px",
//         gap: 32,
//         position: "relative",
//         overflow: "hidden",
//         minHeight: 420,
//       }}
//     >
//       {/* ambient circles */}
//       {[
//         { size: 320, top: -80, left: -80, opacity: 0.06 },
//         { size: 200, bottom: -60, right: -60, opacity: 0.08 },
//         { size: 120, top: "40%", left: "60%", opacity: 0.05 },
//       ].map((c, i) => (
//         <div
//           key={i}
//           style={{
//             position: "absolute",
//             borderRadius: "50%",
//             width: c.size,
//             height: c.size,
//             top: c.top,
//             left: c.left,
//             bottom: c.bottom,
//             right: c.right,
//             background: C.secondary,
//             opacity: c.opacity,
//             pointerEvents: "none",
//           }}
//         />
//       ))}

//       {/* SVG Cup */}
//       <svg
//         width="180"
//         height="180"
//         viewBox="0 0 180 180"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{ filter: "drop-shadow(0 12px 32px #00000050)" }}
//       >
//         {/* saucer */}
//         <ellipse cx="90" cy="148" rx="62" ry="10" fill="#2A1D19" />
//         <ellipse cx="90" cy="145" rx="55" ry="8" fill="#3B2A24" />
//         {/* cup body */}
//         <path d="M42 80 Q44 140 90 142 Q136 140 138 80 Z" fill="#4A3328" />
//         <path
//           d="M42 80 Q44 140 90 142 Q136 140 138 80 Z"
//           fill="url(#cupGrad)"
//         />
//         {/* cup rim */}
//         <ellipse cx="90" cy="80" rx="48" ry="10" fill="#5C3D2E" />
//         <ellipse cx="90" cy="78" rx="44" ry="7" fill="#6B4B3A" />
//         {/* coffee liquid */}
//         <ellipse cx="90" cy="80" rx="40" ry="6" fill="#2C1A12" />
//         <ellipse cx="90" cy="80" rx="36" ry="4" fill="#3D2218" />
//         {/* foam / latte art */}
//         <ellipse cx="90" cy="79" rx="28" ry="3" fill="#C9A27E" opacity="0.7" />
//         <path
//           d="M78 79 Q85 74 90 79 Q95 84 102 79"
//           stroke="#FAF7F2"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           fill="none"
//           opacity="0.6"
//         />
//         <circle cx="90" cy="77" r="3" fill="#FAF7F2" opacity="0.25" />
//         {/* handle */}
//         <path
//           d="M138 95 Q162 95 162 115 Q162 135 138 133"
//           stroke="#5C3D2E"
//           strokeWidth="10"
//           strokeLinecap="round"
//           fill="none"
//         />
//         <path
//           d="M138 95 Q158 95 158 115 Q158 131 138 133"
//           stroke="#6B4B3A"
//           strokeWidth="5"
//           strokeLinecap="round"
//           fill="none"
//         />
//         {/* steam */}
//         <path
//           d="M76 65 Q72 55 76 45 Q80 35 76 25"
//           stroke="#FAF7F2"
//           strokeWidth="2"
//           strokeLinecap="round"
//           fill="none"
//           opacity="0.35"
//           style={{ animation: "steam 3s ease-in-out infinite" }}
//         />
//         <path
//           d="M90 60 Q86 50 90 40 Q94 30 90 20"
//           stroke="#FAF7F2"
//           strokeWidth="2"
//           strokeLinecap="round"
//           fill="none"
//           opacity="0.25"
//           style={{ animation: "steam 3s ease-in-out infinite 0.6s" }}
//         />
//         <path
//           d="M104 65 Q100 55 104 45 Q108 35 104 25"
//           stroke="#FAF7F2"
//           strokeWidth="2"
//           strokeLinecap="round"
//           fill="none"
//           opacity="0.2"
//           style={{ animation: "steam 3s ease-in-out infinite 1.2s" }}
//         />
//         <defs>
//           <linearGradient
//             id="cupGrad"
//             x1="42"
//             y1="80"
//             x2="138"
//             y2="142"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop offset="0%" stopColor="#C9A27E" stopOpacity="0.15" />
//             <stop offset="100%" stopColor="#C9A27E" stopOpacity="0" />
//           </linearGradient>
//         </defs>
//       </svg>

//       <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
//         <h2
//           style={{
//             margin: "0 0 10px",
//             fontSize: 28,
//             fontWeight: 800,
//             color: "#FAF7F2",
//             letterSpacing: "-0.02em",
//             lineHeight: 1.2,
//           }}
//         >
//           {q.h}
//         </h2>
//         <p
//           style={{
//             margin: 0,
//             fontSize: 15,
//             color: C.secondary,
//             lineHeight: 1.6,
//             maxWidth: 260,
//           }}
//         >
//           {q.sub}
//         </p>
//       </div>

//       {/* feature pills */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 10,
//           width: "100%",
//           maxWidth: 280,
//         }}
//       >
//         {[
//           "Single-origin beans",
//           "Freshly roasted weekly",
//           "Free delivery over €40",
//         ].map((f) => (
//           <div
//             key={f}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 10,
//               padding: "10px 16px",
//               borderRadius: 12,
//               background: "rgba(255,255,255,0.06)",
//               border: "1px solid rgba(255,255,255,0.08)",
//             }}
//           >
//             <div
//               style={{
//                 width: 22,
//                 height: 22,
//                 borderRadius: 6,
//                 flexShrink: 0,
//                 background: `${C.accent}30`,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Check size={12} color={C.accent} />
//             </div>
//             <span
//               style={{
//                 fontSize: 13,
//                 color: `${C.secondary}CC`,
//                 fontWeight: 500,
//               }}
//             >
//               {f}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Auth Layout ──────────────────────────────────────────────────────────────
// function AuthLayout({ mode, children }) {
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: C.bg,
//         display: "flex",
//         alignItems: "stretch",
//         fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes steam {
//           0%,100% { transform: translateY(0) scaleX(1); opacity: 0.35; }
//           50%      { transform: translateY(-8px) scaleX(0.8); opacity: 0.1; }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; } to { opacity: 1; }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.96); }
//           to   { opacity: 1; transform: scale(1); }
//         }
//         * { -webkit-font-smoothing: antialiased; }
//         input::placeholder { color: #9CA3AF; }
//         input:-webkit-autofill {
//           -webkit-box-shadow: 0 0 0 30px #fff inset;
//           -webkit-text-fill-color: #1C1917;
//         }
//         .auth-form-pane { animation: fadeUp 0.45s cubic-bezier(.4,0,.2,1) both; }
//         .auth-illus-pane { animation: fadeIn 0.6s ease both 0.1s; }
//         @media (max-width: 768px) {
//           .auth-split { flex-direction: column !important; }
//           .auth-illus-pane { min-height: 300px !important; order: 2; }
//           .auth-form-pane  { order: 1; }
//         }
//       `}</style>

//       <div
//         className="auth-split"
//         style={{
//           display: "flex",
//           width: "100%",
//           maxWidth: 1100,
//           margin: "auto",
//           borderRadius: 24,
//           overflow: "hidden",
//           boxShadow:
//             "0 24px 80px rgba(59,42,36,0.12), 0 4px 16px rgba(59,42,36,0.06)",
//           minHeight: 600,
//         }}
//       >
//         {/* Form pane */}
//         <div
//           className="auth-form-pane"
//           style={{
//             flex: "0 0 480px",
//             background: C.surface,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             padding: "52px 48px",
//             overflowY: "auto",
//           }}
//         >
//           {/* Logo */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 10,
//               marginBottom: 40,
//             }}
//           >
//             <div
//               style={{
//                 width: 38,
//                 height: 38,
//                 borderRadius: 10,
//                 background: C.primary,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Coffee size={20} color="#FAF7F2" />
//             </div>
//             <span
//               style={{
//                 fontSize: 18,
//                 fontWeight: 800,
//                 color: C.textPri,
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Kaffa
//             </span>
//           </div>
//           {children}
//         </div>

//         {/* Illustration pane */}
//         <div className="auth-illus-pane" style={{ flex: 1, minWidth: 0 }}>
//           <IllustrationPanel mode={mode} />
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Login Page ───────────────────────────────────────────────────────────────
// function LoginPage({ onNavigate }) {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     remember: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [showPw, setShowPw] = useState(false);
//   const [status, setStatus] = useState("idle"); // idle | loading | success

//   const validate = () => {
//     const e = {};
//     if (!form.email) e.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       e.email = "Enter a valid email address";
//     if (!form.password) e.password = "Password is required";
//     else if (form.password.length < 8)
//       e.password = "Password must be at least 8 characters";
//     return e;
//   };

//   const handleSubmit = useCallback(async () => {
//     const e = validate();
//     setErrors(e);
//     if (Object.keys(e).length) return;
//     setStatus("loading");
//     await new Promise((r) => setTimeout(r, 1800));
//     setStatus("success");
//   }, [form]);

//   const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   return (
//     <AuthLayout mode="login">
//       <div style={{ animation: "scaleIn 0.35s cubic-bezier(.4,0,.2,1) both" }}>
//         <h1
//           style={{
//             margin: "0 0 4px",
//             fontSize: 26,
//             fontWeight: 800,
//             color: C.textPri,
//             letterSpacing: "-0.02em",
//           }}
//         >
//           Sign in
//         </h1>
//         <p style={{ margin: "0 0 32px", fontSize: 14, color: C.textSec }}>
//           Good to see you again.
//         </p>

//         <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
//           <Input
//             label="Email address"
//             id="login-email"
//             type="email"
//             icon={Mail}
//             placeholder="you@example.com"
//             value={form.email}
//             onChange={(e) => set("email", e.target.value)}
//             error={errors.email}
//             autoComplete="email"
//           />

//           <Input
//             label="Password"
//             id="login-password"
//             type={showPw ? "text" : "password"}
//             icon={Lock}
//             placeholder="••••••••"
//             value={form.password}
//             onChange={(e) => set("password", e.target.value)}
//             error={errors.password}
//             autoComplete="current-password"
//             rightEl={
//               <button
//                 type="button"
//                 onClick={() => setShowPw((v) => !v)}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   cursor: "pointer",
//                   color: C.textSec,
//                   display: "flex",
//                   padding: 2,
//                   transition: "color 0.15s",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = C.textSec)}
//                 aria-label={showPw ? "Hide password" : "Show password"}
//               >
//                 {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             }
//           />

//           {/* Remember + Forgot */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <label
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 cursor: "pointer",
//               }}
//             >
//               <div
//                 onClick={() => set("remember", !form.remember)}
//                 style={{
//                   width: 18,
//                   height: 18,
//                   borderRadius: 5,
//                   border: `1.5px solid ${form.remember ? C.primary : C.border}`,
//                   background: form.remember ? C.primary : "transparent",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   transition: "all 0.15s",
//                   flexShrink: 0,
//                 }}
//               >
//                 {form.remember && (
//                   <Check size={11} color="#fff" strokeWidth={3} />
//                 )}
//               </div>
//               <span
//                 style={{ fontSize: 13, color: C.textSec, userSelect: "none" }}
//               >
//                 Remember me
//               </span>
//             </label>
//             <button
//               type="button"
//               style={{
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 fontSize: 13,
//                 color: C.accent,
//                 fontWeight: 600,
//                 padding: 0,
//                 transition: "opacity 0.15s",
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
//               onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//             >
//               Forgot password?
//             </button>
//           </div>

//           <Button
//             loading={status === "loading"}
//             success={status === "success"}
//             onClick={handleSubmit}
//             disabled={status === "loading" || status === "success"}
//             style={{ marginTop: 4 }}
//           >
//             {status === "success" ? (
//               "Signed in!"
//             ) : (
//               <>
//                 <span>Sign in</span>
//                 <ArrowRight size={16} />
//               </>
//             )}
//           </Button>
//         </div>

//         <p
//           style={{
//             marginTop: 28,
//             textAlign: "center",
//             fontSize: 14,
//             color: C.textSec,
//           }}
//         >
//           Don't have an account?{" "}
//           <button
//             type="button"
//             onClick={() => onNavigate("register")}
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               color: C.primary,
//               fontWeight: 700,
//               fontSize: 14,
//               padding: 0,
//               transition: "opacity 0.15s",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
//             onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//           >
//             Create account
//           </button>
//         </p>
//       </div>
//     </AuthLayout>
//   );
// }

// // ─── Register Page ────────────────────────────────────────────────────────────
// function RegisterPage({ onNavigate }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//     terms: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [showPw, setShowPw] = useState(false);
//   const [showCf, setShowCf] = useState(false);
//   const [status, setStatus] = useState("idle");

//   const strength = getStrength(form.password);

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = "Full name is required";
//     if (!form.email) e.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       e.email = "Enter a valid email address";
//     if (!form.password) e.password = "Password is required";
//     else if (form.password.length < 8)
//       e.password = "Must be at least 8 characters";
//     if (!form.confirm) e.confirm = "Please confirm your password";
//     else if (form.confirm !== form.password)
//       e.confirm = "Passwords don't match";
//     if (!form.terms) e.terms = "You must agree to continue";
//     return e;
//   };

//   const handleSubmit = useCallback(async () => {
//     const e = validate();
//     setErrors(e);
//     if (Object.keys(e).length) return;
//     setStatus("loading");
//     await new Promise((r) => setTimeout(r, 2000));
//     setStatus("success");
//   }, [form]);

//   const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   const EyeBtn = ({ show, toggle, label }) => (
//     <button
//       type="button"
//       onClick={toggle}
//       style={{
//         background: "none",
//         border: "none",
//         cursor: "pointer",
//         color: C.textSec,
//         display: "flex",
//         padding: 2,
//         transition: "color 0.15s",
//       }}
//       onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
//       onMouseLeave={(e) => (e.currentTarget.style.color = C.textSec)}
//       aria-label={label}
//     >
//       {show ? <EyeOff size={16} /> : <Eye size={16} />}
//     </button>
//   );

//   return (
//     <AuthLayout mode="register">
//       <div style={{ animation: "scaleIn 0.35s cubic-bezier(.4,0,.2,1) both" }}>
//         <h1
//           style={{
//             margin: "0 0 4px",
//             fontSize: 26,
//             fontWeight: 800,
//             color: C.textPri,
//             letterSpacing: "-0.02em",
//           }}
//         >
//           Create account
//         </h1>
//         <p style={{ margin: "0 0 28px", fontSize: 14, color: C.textSec }}>
//           Free to join. Cancel any time.
//         </p>

//         <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//           <Input
//             label="Full name"
//             id="reg-name"
//             type="text"
//             icon={User}
//             placeholder="Jane Doe"
//             value={form.name}
//             onChange={(e) => set("name", e.target.value)}
//             error={errors.name}
//             autoComplete="name"
//           />

//           <Input
//             label="Email address"
//             id="reg-email"
//             type="email"
//             icon={Mail}
//             placeholder="you@example.com"
//             value={form.email}
//             onChange={(e) => set("email", e.target.value)}
//             error={errors.email}
//             autoComplete="email"
//           />

//           <div>
//             <Input
//               label="Password"
//               id="reg-pw"
//               type={showPw ? "text" : "password"}
//               icon={Lock}
//               placeholder="Min. 8 characters"
//               value={form.password}
//               onChange={(e) => set("password", e.target.value)}
//               error={errors.password}
//               autoComplete="new-password"
//               rightEl={
//                 <EyeBtn
//                   show={showPw}
//                   toggle={() => setShowPw((v) => !v)}
//                   label={showPw ? "Hide" : "Show"}
//                 />
//               }
//             />
//             {/* strength bar */}
//             {form.password && (
//               <div style={{ marginTop: 8 }}>
//                 <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       style={{
//                         flex: 1,
//                         height: 3,
//                         borderRadius: 4,
//                         background:
//                           i <= strength.score ? strength.color : C.border,
//                         transition: "background 0.3s",
//                       }}
//                     />
//                   ))}
//                 </div>
//                 <span
//                   style={{
//                     fontSize: 11,
//                     fontWeight: 600,
//                     color: strength.color,
//                   }}
//                 >
//                   {strength.label}
//                 </span>
//               </div>
//             )}
//           </div>

//           <Input
//             label="Confirm password"
//             id="reg-confirm"
//             type={showCf ? "text" : "password"}
//             icon={Lock}
//             placeholder="Repeat password"
//             value={form.confirm}
//             onChange={(e) => set("confirm", e.target.value)}
//             error={errors.confirm}
//             autoComplete="new-password"
//             rightEl={
//               <EyeBtn
//                 show={showCf}
//                 toggle={() => setShowCf((v) => !v)}
//                 label={showCf ? "Hide" : "Show"}
//               />
//             }
//           />

//           {/* Terms */}
//           <div>
//             <label
//               style={{
//                 display: "flex",
//                 alignItems: "flex-start",
//                 gap: 10,
//                 cursor: "pointer",
//               }}
//             >
//               <div
//                 onClick={() => set("terms", !form.terms)}
//                 style={{
//                   width: 18,
//                   height: 18,
//                   borderRadius: 5,
//                   flexShrink: 0,
//                   marginTop: 1,
//                   border: `1.5px solid ${errors.terms ? C.error : form.terms ? C.primary : C.border}`,
//                   background: form.terms ? C.primary : "transparent",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   transition: "all 0.15s",
//                 }}
//               >
//                 {form.terms && <Check size={11} color="#fff" strokeWidth={3} />}
//               </div>
//               <span
//                 style={{
//                   fontSize: 13,
//                   color: C.textSec,
//                   userSelect: "none",
//                   lineHeight: 1.5,
//                 }}
//               >
//                 I agree to the{" "}
//                 <button
//                   type="button"
//                   style={{
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     color: C.accent,
//                     fontWeight: 600,
//                     fontSize: 13,
//                     padding: 0,
//                   }}
//                 >
//                   Terms of Service
//                 </button>{" "}
//                 and{" "}
//                 <button
//                   type="button"
//                   style={{
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     color: C.accent,
//                     fontWeight: 600,
//                     fontSize: 13,
//                     padding: 0,
//                   }}
//                 >
//                   Privacy Policy
//                 </button>
//               </span>
//             </label>
//             {errors.terms && (
//               <span
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 4,
//                   fontSize: 12,
//                   color: C.error,
//                   marginTop: 4,
//                   paddingLeft: 28,
//                 }}
//               >
//                 <AlertCircle size={12} /> {errors.terms}
//               </span>
//             )}
//           </div>

//           <Button
//             loading={status === "loading"}
//             success={status === "success"}
//             onClick={handleSubmit}
//             disabled={status === "loading" || status === "success"}
//             style={{ marginTop: 4 }}
//           >
//             {status === "success" ? (
//               "Account created!"
//             ) : (
//               <>
//                 <span>Create account</span>
//                 <ArrowRight size={16} />
//               </>
//             )}
//           </Button>
//         </div>

//         <p
//           style={{
//             marginTop: 24,
//             textAlign: "center",
//             fontSize: 14,
//             color: C.textSec,
//           }}
//         >
//           Already have an account?{" "}
//           <button
//             type="button"
//             onClick={() => onNavigate("login")}
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               color: C.primary,
//               fontWeight: 700,
//               fontSize: 14,
//               padding: 0,
//               transition: "opacity 0.15s",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
//             onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//           >
//             Sign in
//           </button>
//         </p>
//       </div>
//     </AuthLayout>
//   );
// }

// // ─── App Router ───────────────────────────────────────────────────────────────
// export default function App() {
//   const [page, setPage] = useState("login");
//   if (page === "register") return <RegisterPage onNavigate={setPage} />;
//   return <LoginPage onNavigate={setPage} />;
// }
