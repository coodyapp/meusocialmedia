
import { useState } from "react";
import { Button,Input,Label,Alert, AlertDescription, } from '@meusocialmedia/ui';
import { useNavigate, useSearch } from "@tanstack/react-router";


import { Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { ModernBackground } from "@/components/modern-background";

interface LoginFormData {
  phone: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!formData.phone || !formData.password) {
        throw new Error("Por favor, preencha todos os campos");
      }

      if (formData.phone.length < 10) {
        throw new Error("Número de telefone inválido");
      }

      if (formData.password.length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
      }

      // Simulate login validation
      if (formData.password === "123456") {
        navigate({ to: "/chat" });
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <ModernBackground />

      <div className="w-full max-w-md space-y-8 glass-morphism p-8 rounded-2xl border animate-fade-in-up">
        {/* Logo */}
        <div className="text-center">
          <div className="relative inline-block p-4 rounded-2xl bg-primary/10 backdrop-blur-sm animate-float">
            <Image
              src="/images/logo-vertical-color.png"
              alt="Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Bem-vindo de volta</h1>
          <p className="text-muted-foreground">Entre com suas credenciais para continuar</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="animate-fade-in-up">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Número do Telefone
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })
                }
                className="pl-12 h-12 glass-morphism border-border focus:border-primary focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-12 pr-12 h-12 glass-morphism border-border focus:border-primary focus:ring-primary/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                Lembrar de mim
              </label>
            </div>

            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Esqueceu a senha?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Entrando...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Entrar</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </Button>
        </form>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Criar conta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
