
import { useState } from "react";
import { Button,Input,Label,Alert, AlertDescription, } from '@meusocialmedia/ui';
import { useNavigate, useSearch } from "@tanstack/react-router";


import { Phone, ArrowRight, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!phone) {
        throw new Error("Por favor, preencha o número de telefone");
      }

      if (phone.length < 10) {
        throw new Error("Número de telefone inválido");
      }

      setSuccess("Código de recuperação enviado para seu telefone!");
      setTimeout(() => {
        router.push(`/reset-password?phone=${encodeURIComponent(phone)}`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar código");
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 glass-morphism p-8 rounded-2xl border animate-fade-in-up">
        {/* Logo */}
        <div className="text-center">
          <div className="relative inline-block p-4 rounded-2xl bg-orange-500/10 backdrop-blur-sm animate-float-delayed-reverse">
            <Image
              src="/images/logo-vertical-color.png"
              alt="Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Esqueceu sua senha?</h1>
          <p className="text-muted-foreground">
            Digite seu telefone para receber o código de recuperação
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="animate-fade-in-up">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400 animate-fade-in-up">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Recovery Form */}
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
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                className="pl-12 h-12 glass-morphism border-border focus:border-orange-500 focus:ring-orange-500/20"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enviaremos um código de recuperação para este número
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 glass-morphism border-border hover:bg-muted/50 transition-all duration-300"
              onClick={() => navigate({ to: "/login" })}
              disabled={loading}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium transition-all duration-300 hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Enviando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Enviar código</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </Button>
          </div>
        </form>

        {/* Back to login */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Lembrou da senha?{" "}
            <Link
              href="/login"
              className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
            >
              Fazer login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
