import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@meusocialmedia/ui";
import { ChevronDown } from "lucide-react";

interface FAQSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export function FAQSection({ onScrollToSection }: FAQSectionProps) {
  return (
    <section
      id="faq"
      className="w-full py-12 md:py-24 lg:py-32 scroll-mt-16 relative overflow-hidden"
    >
      <div className="container relative px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Perguntas Frequentes
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Tire suas dúvidas sobre nossos agentes de IA para redes sociais.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl mt-16">
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "É mais barato que contratar uma agência?",
                answer:
                  "Sim! O Meu Socialmedia foi criado justamente para quem não consegue arcar com os custos de uma agência. Você recebe sugestões de conteúdo personalizadas por um valor muito mais acessível.",
              },
              {
                question: "Eu preciso entender de marketing para usar?",
                answer:
                  "De jeito nenhum. Nosso serviço é feito para ser simples. Você só responde três perguntas e já começa a receber ideias prontas para postar.",
              },
              {
                question: "As sugestões são realmente personalizadas?",
                answer:
                  "Sim! Nossos agentes de IA analisam seu negócio, público-alvo e objetivos para criar conteúdo específico para sua marca. Cada sugestão é única e adaptada ao seu nicho de mercado.",
              },
              {
                question: "Como funciona o período de teste gratuito?",
                answer:
                  "Você tem 7 dias para testar todos os recursos do plano escolhido sem nenhum custo. Durante este período, pode cancelar a qualquer momento sem cobrança.",
              },
              {
                question: "Posso cancelar minha assinatura a qualquer momento?",
                answer:
                  "Sim! Não há fidelidade. Você pode cancelar sua assinatura a qualquer momento através do painel de controle ou entrando em contato conosco.",
              },
              {
                question: "Os agentes funcionam em português?",
                answer:
                  "Sim! Todos os nossos agentes são especializados em português brasileiro e entendem as nuances culturais e linguísticas do mercado nacional.",
              },
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-morphism bg-background/10 dark:bg-background/5 backdrop-blur-xl border-0 rounded-2xl px-6 transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent hover:from-primary hover:to-primary/80 transition-all duration-300 py-6 group [&[data-state=open]>svg]:rotate-180">
                  <span className="flex-1 pr-4">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-primary transition-transform duration-300 shrink-0 group-hover:text-primary/80" />
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base md:text-lg leading-relaxed pt-2 pb-6">
                  <div className="glass-morphism bg-background/5 dark:bg-background/10 backdrop-blur-sm border-0 rounded-xl p-4 mt-2">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Additional CTA */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Nossa equipe está pronta para esclarecer qualquer dúvida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => onScrollToSection("contact")}
              >
                Falar conosco
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 bg-transparent hover:text-white"
                onClick={() => onScrollToSection("pricing")}
              >
                Ver planos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
