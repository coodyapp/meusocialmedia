import { ArrowRight, Globe, MessageCircle, Sparkles } from "lucide-react";
import { Button, Badge } from "@meusocialmedia/ui";
import { ModernBackground } from "@/components/modern-background";

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenDemo: () => void;
}

export function HeroSection({ onScrollToSection, onOpenDemo }: HeroSectionProps) {
  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col">
      <ModernBackground />

      {/* Header with Logo and Theme Toggle */}
      <header className="relative z-20 flex items-center justify-between p-6">
        <a
          href="/"
          className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
        >
          <img
            src="/images/logo-vertical-color.png"
            alt="meu Social media"
            width={100}
            height={100}
            className="brightness-0 dark:brightness-100"
          />
        </a>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        <div className="container relative px-4 md:px-6 z-10 h-full">
          <div className="flex flex-col items-center justify-center text-center space-y-8 min-h-[80vh]">
            <div className="flex flex-col items-center space-y-8 max-w-4xl">
              {/* Badge */}
              <Badge className="inline-flex bg-primary/20 text-primary border-primary/30 backdrop-blur-sm hover:bg-primary/30 transition-all duration-300">
                <Sparkles className="h-4 w-4 mr-2 transition-transform duration-300 hover:rotate-12" />
                Otimize seu tempo!
              </Badge>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl">
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                    Agentes de IA
                  </span>
                  <br />
                  <span className="text-foreground">para Social Media</span>
                </h1>

                <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed mx-auto">
                  Turbine sua presença nas redes sociais com agentes inteligentes que criam,
                  gerenciam e otimizam conteúdo para suas plataformas.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                  onClick={() => onScrollToSection("pricing")}
                >
                  Ver planos
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 bg-transparent hover:text-white"
                  onClick={onOpenDemo}
                >
                  Demonstração
                </Button>
              </div>

              {/* Platform Icons */}
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2 hover:text-primary transition-all duration-300 hover:scale-110">
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">Web</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-primary transition-all duration-300 hover:scale-110">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
