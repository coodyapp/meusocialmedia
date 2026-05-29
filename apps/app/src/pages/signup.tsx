import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button, Input, Label, Alert, AlertDescription } from "@meusocialmedia/ui";
import { Phone, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { ModernBackground } from "@/components/modern-background";

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: phone.replace(/\D/g, ""), password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Erro ao criar conta");
      }
      navigate({ to: "/verify-otp", search: { phone: phone.replace(/\D/g, ""), name } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
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
          <h1 className="text-3xl font-bold">Criar sua conta</h1>
          <p className="text-muted-foreground">Comece agora, é grátis por 7 dias</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Ao criar uma conta você concorda com nossos{" "}
            <Link to="/" className="text-primary hover:underline">
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link to="/" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Criando conta...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Criar conta <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
