import { useState } from "react";
import { X, Shield, Loader2, ExternalLink } from "lucide-react";
import { Button, Card, Badge } from "@meusocialmedia/ui";
import { PricingPlan } from "@/data/pricing-plans";

interface StripeCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan;
}

export function StripeCheckout({ isOpen, onClose, plan }: StripeCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleStripeCheckout = async () => {
    setIsProcessing(true);

    try {
      // Simulate creating Stripe checkout session
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real implementation, you would:
      // 1. Call your backend API to create a Stripe checkout session
      // 2. Redirect to Stripe's hosted checkout page

      const stripeCheckoutUrl = `https://checkout.stripe.com/pay/cs_test_${Math.random().toString(36).substring(7)}`;

      const checkoutWindow = window.open(
        stripeCheckoutUrl,
        "stripe-checkout",
        "width=800,height=600,scrollbars=yes,resizable=yes",
      );

      const checkInterval = setInterval(() => {
        if (checkoutWindow?.closed) {
          clearInterval(checkInterval);
          setIsProcessing(false);
          alert(`Redirecionamento para pagamento do ${plan.title} concluído!`);
          onClose();
        }
      }, 1000);

      setTimeout(() => {
        if (checkoutWindow && !checkoutWindow.closed) {
          checkoutWindow.close();
        }
        clearInterval(checkInterval);
        setIsProcessing(false);
      }, 300000);
    } catch (error) {
      console.error("Erro ao processar checkout:", error);
      setIsProcessing(false);
      alert("Erro ao processar pagamento. Tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <Card className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-xl font-semibold">Assinatura</h2>
              <p className="text-sm text-muted-foreground">{plan.title}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-primary rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Payment Method Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-blue-200/50 dark:border-blue-800/50">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Pagamento Seguro via Stripe
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  Você será redirecionado para o checkout seguro do Stripe, onde poderá escolher seu
                  método de pagamento preferido.
                </p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total {plan.priceSubtext ? "Mensal" : ""}:</span>
              <span
                className={`bg-gradient-to-r ${plan.priceGradient || plan.titleGradient} bg-clip-text text-transparent`}
              >
                {plan.price}
                {plan.priceSubtext}
              </span>
            </div>
            {plan.priceSubtext && (
              <p className="text-xs text-muted-foreground mt-1">
                Cobrança recorrente mensal. Cancele a qualquer momento.
              </p>
            )}
          </div>

          {/* Checkout Button */}
          <Button
            onClick={handleStripeCheckout}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Redirecionando para Stripe...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Pagar com Stripe</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            )}
          </Button>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p className="mb-2">
              Processado de forma segura pelo{" "}
              <span className="font-medium text-foreground">Stripe</span>
            </p>
            <p>
              Ao continuar, você concorda com nossos{" "}
              <button className="text-primary hover:underline">Termos de Serviço</button> e{" "}
              <button className="text-primary hover:underline">Política de Privacidade</button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
