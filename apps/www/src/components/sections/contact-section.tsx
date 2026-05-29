import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import {
  Card,
  CardContent,
  Input,
  Textarea,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@meusocialmedia/ui";

export function ContactSection() {
  const [contactForm, setContactForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    comoReceber: "",
    duvida: "",
  });

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container relative px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Animated message icons */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Animated rotating circle with text */}
                <div className="absolute inset-0 animate-spin-slow">
                  <svg viewBox="0 0 160 160" className="w-full h-full">
                    <defs>
                      <path
                        id="circle-path"
                        d="M 80, 80 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                      />
                    </defs>
                    <text className="text-xs fill-primary font-medium tracking-wider">
                      <textPath href="#circle-path">
                        FALE CONOSCO • FALE CONOSCO • FALE CONOSCO •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Tem dúvidas ou quer saber mais?
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                Nossa equipe está pronta para ajudar você a otimizar sua presença nas redes sociais.
              </p>
            </div>

            {/* Additional info cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="glass-morphism bg-background/10 dark:bg-background/5 backdrop-blur-xl border-0 rounded-xl p-4 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">WhatsApp</p>
                    <p className="text-muted-foreground text-xs">Resposta em minutos</p>
                  </div>
                </div>
              </div>
              <div
                className="glass-morphism bg-background/10 dark:bg-background/5 backdrop-blur-xl border-0 rounded-xl p-4 shadow-2xl"
                style={{ animationDelay: "200ms" }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Email</p>
                    <p className="text-muted-foreground text-xs">Resposta em 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-lg glass-morphism bg-background/10 dark:bg-background/5 backdrop-blur-xl border-0 shadow-2xl rounded-2xl">
              <CardContent className="p-8">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form submitted:", contactForm);
                    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
                    setContactForm({
                      nome: "",
                      sobrenome: "",
                      email: "",
                      whatsapp: "",
                      empresa: "",
                      comoReceber: "",
                      duvida: "",
                    });
                  }}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Input
                        placeholder="Seu nome"
                        value={contactForm.nome}
                        onChange={(e) => setContactForm({ ...contactForm, nome: e.target.value })}
                        className="glass-morphism bg-background/20 border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:bg-background/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Sobrenome"
                        value={contactForm.sobrenome}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, sobrenome: e.target.value })
                        }
                        className="glass-morphism bg-background/20 border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:bg-background/30"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Seu email corporativo"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="glass-morphism bg-primary/10 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-primary/20"
                      required
                    />
                    <p className="text-primary text-xs">Informe um e-mail corporativo válido</p>
                  </div>

                  <div className="space-y-2">
                    <Input
                      type="tel"
                      placeholder="Seu celular com ddd"
                      value={contactForm.whatsapp}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, whatsapp: e.target.value })
                      }
                      className="glass-morphism bg-background/20 border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:bg-background/30"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="Sua empresa"
                      value={contactForm.empresa}
                      onChange={(e) => setContactForm({ ...contactForm, empresa: e.target.value })}
                      className="glass-morphism bg-background/20 border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:bg-background/30"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Select
                      value={contactForm.comoReceber}
                      onValueChange={(value) =>
                        setContactForm({ ...contactForm, comoReceber: value })
                      }
                    >
                      <SelectTrigger className="glass-morphism bg-background/20 border-primary/20 text-foreground focus:border-primary/40 focus:bg-background/30">
                        <SelectValue placeholder="Como deseja receber o nosso contato?" />
                      </SelectTrigger>
                      <SelectContent className="glass-morphism bg-background/95 dark:bg-background/95 backdrop-blur-xl border-primary/20">
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="telefone">Telefone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Como podemos ajudar?"
                      rows={4}
                      value={contactForm.duvida}
                      onChange={(e) => setContactForm({ ...contactForm, duvida: e.target.value })}
                      className="glass-morphism bg-background/20 border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:bg-background/30 resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-semibold group"
                    size="lg"
                  >
                    Enviar Mensagem
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
