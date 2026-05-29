import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button, Input, Label, Alert, AlertDescription } from "@meusocialmedia/ui";
import { Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { ModernBackground } from "@/components/modern-background";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");

  const formatPhone = (value: string) => {
    const n = value.replace(/\D/g, "").slice(0, 11);
    if (n.length > 10) return n.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    if (n.length > 6) return n.replace(/(\d{2})(\d{5})(\d*)/, "($1) $2-$3");
    return n;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.replace(/\D/g, "") }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Erro ao enviar código");
      }
      setSent(true);
      setTimeout(() => navigate({ to: "/verify-otp", search: { phone: phone.replace(/\D/g, "") } }), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar código");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ModernBackground />
      <div className="w-full max-w-md space-y-8 bg-card/80 backdrop-blur-sm p-8 rounded-2xl border shadow-xl">
        <div className="text-center space-y-2">
          <img src="/images/logo-vertical-color.png" alt="Logo" className="mx-auto h-14 w-auto" />
          <h1 className="text-3xl font-bold">Recuperar senha</h1>
          <p className="text-muted-foreground">Enviaremos um código pelo WhatsApp</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {sent ? (
          <Alert>
            <AlertDescription>Código enviado! Redirecionando...</AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="phone">Número de Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Enviar código <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground">
          <Link to="/login" className="flex items-center justify-center gap-1 text-primary hover:underline">
            <ArrowLeft className="h-3 w-3" /> Voltar ao login
          </Link>
        </p>
      </div>
    </div>
  );
}
