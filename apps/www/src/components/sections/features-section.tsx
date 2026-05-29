import { MessageSquare, ImageIcon, Zap, Target, AudioLines, BrainCircuit } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@meusocialmedia/ui";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 scroll-mt-16 relative overflow-hidden"
    >
      <div className="container relative px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Recursos poderosos</h2>
            <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Criado para pequenos empreendedores que precisam manter a presença online, mas não têm
              tempo ou verba para contratar uma agência.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {[
            {
              icon: MessageSquare,
              title: "Criação de Conteúdo",
              description: "Gere posts, legendas e comentários envolventes adaptados à sua marca.",
            },
            {
              icon: ImageIcon,
              title: "Geração de Imagens",
              description: "Crie visuais impressionantes e gráficos para seus posts com IA.",
            },
            {
              icon: Zap,
              title: "Multiplataforma",
              description: "Acesse seus agentes via Web ou WhatsApp.",
            },
            {
              icon: Target,
              title: "Segmentação Inteligente",
              description:
                "Identifique e alcance seu público-alvo com precisão usando IA avançada.",
            },
            {
              icon: AudioLines,
              title: "Geração de Áudio",
              description: "Transforme textos em áudios profissionais com apenas um comando.",
            },
            {
              icon: BrainCircuit,
              title: "Contexto Inteligente",
              description:
                "Salva automaticamente seu contexto e reseta quando você solicitar, sem perder informações importantes.",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="glass-morphism border-0 backdrop-blur-xl bg-background/10 dark:bg-background/5 h-full transition-all duration-500 hover:scale-105 group animate-in fade-in rounded-2xl overflow-hidden hover:shadow-2xl"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="text-center relative">
                {/* Icon with gradient background */}
                <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/70 p-0.5 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-2xl bg-background/90 dark:bg-background/80 flex items-center justify-center backdrop-blur-sm">
                    <feature.icon className="h-8 w-8 text-secondary" />
                  </div>
                </div>

                <CardTitle className="text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
