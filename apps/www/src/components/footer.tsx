import { MessageCircle, Linkedin, Twitter, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-background border-t border-border/40">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="container relative px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <img
              src="/images/logo-horizontal-mono.png"
              alt="meu Social media"
              width={200}
              height={100}
              className="brightness-0 dark:brightness-100"
            />
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Turbine sua presença nas redes sociais com agentes inteligentes que criam, gerenciam e
              otimizam conteúdo para suas plataformas.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors duration-300 group"
              >
                <MessageCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors duration-300 group"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors duration-300 group"
              >
                <Twitter className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Produto</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Recursos
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Preços
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Contato
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-border/40 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">
              © 2025 meu Social media. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="/privacy-policy"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Política de Privacidade
              </a>
              <a
                href="/terms-of-service"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Termos de Serviço
              </a>
              <a
                href="#cookies"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 group"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
