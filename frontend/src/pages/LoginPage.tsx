import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true);
    try {
      await client.post("/auth/request-otp", { email });
      setStep("otp");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await client.post("/auth/verify-otp", { email, code });
      setAuth(res.data.user, res.data.token);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-8">
      <div className="max-w-[450px] my-12 mx-auto p-8 bg-white rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.1)]">
        {step === "email" ? (
          <>
            <h1 className="text-[2rem] text-[--color-text] mb-6 text-center">
              Login with OTP
            </h1>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-md border border-[#ddd] text-[0.95rem] outline-none focus:border-[--color-primary]"
            />
            <button
              className="w-full px-4 py-3 bg-[--color-primary] text-white rounded-md text-base cursor-pointer font-semibold border-none hover:bg-[--color-primary-dark] transition-colors"
              disabled={loading}
              onClick={sendOtp}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <h1 className="text-[2rem] text-[--color-text] mb-6 text-center">
              Enter OTP
            </h1>
            <p className="text-center text-[--color-text-light] mb-6">
              We've sent a 6-digit code to {email}
            </p>
            <input
              type="text"
              placeholder="Enter 6 digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-md border border-[#ddd] text-[0.95rem] outline-none focus:border-[--color-primary]"
            />
            <button
              className="w-full px-4 py-3 bg-[--color-primary] text-white rounded-md text-base cursor-pointer font-semibold border-none hover:bg-[--color-primary-dark] transition-colors"
              disabled={loading}
              onClick={verifyOtp}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
            <button
              className="w-full px-4 py-3 bg-[--color-bg-light] text-[--color-text] rounded-md text-base cursor-pointer font-semibold border-none mt-2 hover:bg-[#e0e0e0] transition-colors"
              onClick={() => setStep("email")}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
