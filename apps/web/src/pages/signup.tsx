
import { useState } from "react";
import { Button,Input,Label,Alert, AlertDescription, } from '@meusocialmedia/ui';
import { useNavigate, useSearch } from "@tanstack/react-router";


import { Phone, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";

interface SignUpFormData {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!formData.name || !formData.phone || !formData.password || !formData.confirmPassword) {
        throw new Error("Por favor, preencha todos os campos");
      }

      if (formData.phone.length < 10) {
        throw new Error("Número de telefone inválido");
      }

      if (formData.password.length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Senhas não coincidem");
      }

      // Navigate to OTP verification
      router.push(
        `/verify-otp?phone=${encodeURIComponent(formData.phone)}&name=${encodeURIComponent(formData.name)}`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 glass-morphism p-8 rounded-2xl border animate-fade-in-up">
        {/* Logo */}
        <div className="text-center">
          <div className="relative inline-block p-4 rounded-2xl bg-secondary/10 backdrop-blur-sm animate-float-delayed">
            <Image
              src="/images/logo-vertical-color.png"
              alt="Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Criar nova conta</h1>
          <p className="text-muted-foreground">Preencha os dados abaixo para começar</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="animate-fade-in-up">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome Completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-12 h-12 glass-morphism border-border focus:border-secondary focus:ring-secondary/20"
                required
              />
            </div>
          </div>

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
                className="pl-12 h-12 glass-morphism border-border focus:border-secondary focus:ring-secondary/20"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enviaremos um código de verificação para este número
            </p>
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
                className="pl-12 pr-12 h-12 glass-morphism border-border focus:border-secondary focus:ring-secondary/20"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmar Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pl-12 pr-12 h-12 glass-morphism border-border focus:border-secondary focus:ring-secondary/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-secondary focus:ring-secondary border-border rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-foreground">
              Eu concordo com os{" "}
              <Link
                href="/terms"
                className="text-secondary hover:text-secondary/80 transition-colors"
              >
                Termos de Serviço
              </a>{" "}
              e{" "}
              <Link
                href="/privacy"
                className="text-secondary hover:text-secondary/80 transition-colors"
              >
                Política de Privacidade
              </a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium transition-all duration-300 hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 border-2 border-secondary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Criando conta...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Criar conta</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </Button>
        </form>

        {/* Sign in link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-medium text-secondary hover:text-secondary/80 transition-colors"
            >
              Fazer login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
