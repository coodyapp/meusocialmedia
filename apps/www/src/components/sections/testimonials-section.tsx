import { ArrowRight, Star } from "lucide-react";
import { Card, CardContent, Badge, Button } from "@meusocialmedia/ui";
import { useEffect, useState, useRef } from "react";
import { pricingPlans, PricingPlan } from "@/data/pricing-plans";
import { testimonials } from "@/data/testimonials";

interface TestimonialsSectionProps {
  onStartNow: (plan: PricingPlan) => void;
}

export function TestimonialsSection({ onStartNow }: TestimonialsSectionProps) {
  const [count, setCount] = useState(0);
  const [displayedTestimonials, setDisplayedTestimonials] = useState<typeof testimonials>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const premiumPlan = pricingPlans.find((plan) => plan.id === "premium")!;

  useEffect(() => {
    const getRandomTestimonials = () => {
      const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 6);
    };

    setDisplayedTestimonials(getRandomTestimonials());
  }, []);

  // Animate count up
  useEffect(() => {
    const target = 5000;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 scroll-mt-16 relative overflow-hidden"
    >
      <div className="container relative px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-4 mb-4">
            <Badge className="inline-flex bg-primary/20 text-primary border-primary/30 mb-4 backdrop-blur-sm hover:bg-primary/30 transition-all duration-300">
              <Star className="h-4 w-4 mr-1 fill-current transition-transform duration-300 hover:rotate-12" />
              Depoimentos Reais
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              O que nossos usuários dizem
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Veja como nossos agentes de IA estão transformando a presença digital de criadores e
              empresas.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
              +{count.toLocaleString("pt-BR")}
            </div>
            <p className="text-muted-foreground text-lg font-medium">empresários satisfeitos</p>
          </div>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {displayedTestimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass-morphism border-0 backdrop-blur-xl bg-background/10 dark:bg-background/5 h-full transition-all duration-500 hover:scale-105 group rounded-2xl overflow-hidden animate-in fade-in hover:shadow-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Quote */}
                <blockquote className="text-muted-foreground text-sm leading-relaxed mb-6 relative">
                  <span className="text-3xl text-primary/30 absolute -top-2 -left-2">"</span>
                  <p className="relative z-10 italic">{testimonial.content}</p>
                  <span className="text-3xl text-primary/30 absolute -bottom-4 -right-2">"</span>
                </blockquote>

                {/* Author info */}
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 backdrop-blur-sm flex items-center justify-center text-primary text-xs font-semibold border-2 border-secondary/30 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-sm font-bold text-white">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-base">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
            Pronto para transformar suas redes sociais?
          </h3>
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            Comece hoje e veja resultados reais em suas redes sociais em poucos dias.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 font-semibold group"
            onClick={() => onStartNow(premiumPlan)}
          >
            Começar Agora
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
