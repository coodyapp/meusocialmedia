import { useState } from "react";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Badge,
} from "@meusocialmedia/ui";
import { pricingPlans, PricingPlan } from "@/data/pricing-plans";

interface PricingSectionProps {
  onStartNow: (plan: PricingPlan) => void;
}

export function PricingSection({ onStartNow }: PricingSectionProps) {
  const [_selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handleCardClick = (plan: PricingPlan) => {
    if (plan.id === "enterprise") {
      const contactElement = document.getElementById("contact");
      if (contactElement) {
        const elementPosition = contactElement.offsetTop;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
      return;
    }

    setSelectedPlan(plan);
    onStartNow(plan);
  };

  return (
    <>
      <section
        id="pricing"
        className="w-full py-12 md:py-24 lg:py-32 scroll-mt-16 relative overflow-hidden"
      >
        <div className="container relative px-4 md:px-6 z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Preços simples e transparentes
              </h2>
              <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                Escolha o plano que funciona melhor para suas necessidades.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
            {pricingPlans.map((plan, index) => (
              <Card
                key={plan.id}
                className="glass-morphism border-2 border-primary/50 relative overflow-hidden h-full transition-all duration-500 hover:scale-105 hover:shadow-2xl group rounded-2xl cursor-pointer"
                onClick={() => handleCardClick(plan)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="text-center relative pt-8">
                  <div
                    className={`mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.iconGradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full rounded-2xl bg-background/90 dark:bg-background/80 flex items-center justify-center backdrop-blur-sm">
                      <plan.icon
                        className={`h-8 w-8 ${plan.id === "premium" ? "text-primary" : ""}`}
                      />
                    </div>
                  </div>
                  <CardTitle
                    className={`text-2xl bg-gradient-to-r ${plan.titleGradient} bg-clip-text text-transparent`}
                  >
                    {plan.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <div
                      className={`text-5xl font-bold ${plan.priceGradient ? `bg-gradient-to-r ${plan.priceGradient} bg-clip-text text-transparent` : ""}`}
                    >
                      {plan.price}
                      <span className="text-lg font-normal text-muted-foreground">
                        {plan.priceSubtext}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className={`mr-3 h-5 w-5 flex-shrink-0 text-${plan.color}`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="px-6 pb-6">
                  <div className="w-full text-center">
                    {plan.badge && (
                      <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                        {plan.badge}
                      </Badge>
                    )}
                  </div>
                </CardFooter>

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${plan.color}/5 via-transparent to-${plan.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                />
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
              Não tem certeza qual plano escolher?
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Comece com o plano Padrão e faça upgrade a qualquer momento. Todos os planos incluem 7
              dias de teste grátis.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center transition-all duration-300 hover:scale-105">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center transition-all duration-300 hover:scale-105">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Cancele a qualquer momento</span>
              </div>
              <div className="flex items-center transition-all duration-300 hover:scale-105">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
