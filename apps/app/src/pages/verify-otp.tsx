import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button, Alert, AlertDescription } from "@meusocialmedia/ui";
import { ArrowRight, RotateCcw } from "lucide-react";
import { ModernBackground } from "@/components/modern-background";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { phone?: string; name?: string };
  const phone = search.phone ?? "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendCooldown, setResendCooldown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Digite os 6 dígitos do código");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone, code }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Código inválido");
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      setResendCooldown(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch {
      setError("Erro ao reenviar código");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ModernBackground />
      <div className="w-full max-w-md space-y-8 bg-card/80 backdrop-blur-sm p-8 rounded-2xl border shadow-xl">
        <div className="text-center space-y-2">
          <img src="/images/logo-vertical-color.png" alt="Logo" className="mx-auto h-14 w-auto" />
          <h1 className="text-3xl font-bold">Verificar código</h1>
          <p className="text-muted-foreground">
            Enviamos um código para {phone ? `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-****` : "seu WhatsApp"}
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-bold border rounded-lg bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
              />
            ))}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Verificando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Verificar <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="flex items-center justify-center gap-1 mx-auto text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            {resendCooldown > 0 ? `Reenviar em ${resendCooldown}s` : "Reenviar código"}
          </button>
        </div>
      </div>
    </div>
  );
}
