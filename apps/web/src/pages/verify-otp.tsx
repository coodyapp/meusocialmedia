
import { useState, useEffect } from "react";
import { Button,Input,Label,Alert, AlertDescription, } from '@meusocialmedia/ui';
import { useNavigate, useSearch } from "@tanstack/react-router";


import { ArrowRight, ArrowLeft, Phone } from "lucide-react";

export default function VerifyOTPPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { phone?: string; name?: string };
  
  
  const phone = search.phone ?? "" || "";
  const name = search.name ?? "" || "";


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (!phone) {
      navigate({ to: "/signup" });
      return;
    }

    // Start countdown timer
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phone, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (otp.length !== 6) {
        throw new Error("Código OTP deve ter 6 dígitos");
      }

      if (otp === "123456") {
        setSuccess("Conta criada com sucesso!");
        setTimeout(() => {
          navigate({ to: "/chat" });
        }, 1000);
      } else {
        throw new Error("Código OTP inválido");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro na verificação");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("Novo código OTP enviado!");
      setResendTimer(60);

      // Restart timer
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError("Erro ao reenviar código");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 glass-morphism p-8 rounded-2xl border animate-fade-in-up">
        {/* Logo */}
        <div className="text-center">
          <div className="relative inline-block p-4 rounded-2xl bg-green-500/10 backdrop-blur-sm animate-float-reverse">
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
          <h1 className="text-3xl font-bold text-foreground">Verificar telefone</h1>
          <p className="text-muted-foreground">Enviamos um código de 6 dígitos para</p>
          <p className="font-medium text-foreground brand-green">{phone}</p>
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

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-medium">
              Código de Verificação
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(value);
                }}
                className="pl-12 h-12 text-center text-lg tracking-widest glass-morphism border-border focus:border-brand-green focus:ring-brand-green/20"
                maxLength={6}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Digite o código de 6 dígitos enviado por SMS
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 glass-morphism border-border hover:bg-muted/50 transition-all duration-300"
              onClick={() => window.history.back()}
              disabled={loading}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-brand-green hover:bg-brand-green/90 text-black font-medium transition-all duration-300 hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Verificando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Verificar</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </Button>
          </div>
        </form>

        {/* Resend OTP */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Não recebeu o código?</p>
          <Button
            type="button"
            variant="link"
            className="text-sm text-brand-green hover:text-brand-green/80 transition-colors"
            onClick={handleResendOTP}
            disabled={resendTimer > 0 || loading}
          >
            {resendTimer > 0 ? (
              <span className="flex items-center space-x-2">
                <div className="h-3 w-3 border border-muted-foreground border-t-transparent rounded-full animate-spin" />
                <span>Reenviar em {resendTimer}s</span>
              </span>
            ) : (
              "Reenviar código"
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Problemas para receber o código?</p>
          <Link
            href="/support"
            className="text-brand-green hover:text-brand-green/80 transition-colors"
          >
            Entre em contato conosco
          </a>
        </div>
      </div>
    </div>
  );
}
