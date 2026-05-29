import { Zap, Star, Crown, Icon } from "lucide-react";

export interface PricingPlan {
  id: "standard" | "premium" | "enterprise";
  title: string;
  description: string;
  price: string;
  priceSubtext?: string;
  icon: typeof Icon;
  iconGradient: string;
  titleGradient: string;
  priceGradient?: string;
  features: string[];
  badge?: string;
  isPopular?: boolean;
  color: "primary" | "secondary" | "white" | "foreground";
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "standard",
    title: "Plano Padrão",
    description: "Para quem está começando",
    price: "R$50",
    priceSubtext: "/mês",
    icon: Zap,
    iconGradient: "from-foreground to-foreground/70",
    titleGradient: "from-foreground to-foreground/70",
    priceGradient: "from-foreground to-foreground/70",
    features: [
      "Acesso a todos os agentes especializados",
      "Acesso multiplataforma (Web e WhatsApp)",
      "2.000 mensagens",
      "20 minutos de áudio",
      "100 imagens geradas",
      "Suporte via e-mail",
      "7 dias de teste grátis",
      "Uso pessoal/freelancers",
    ],
    color: "white",
  },
  {
    id: "premium",
    title: "Plano Premium",
    description: "Para profissionais e pequenas empresas",
    price: "R$99",
    priceSubtext: "/mês",
    icon: Star,
    iconGradient: "from-primary to-primary/70",
    titleGradient: "from-primary to-primary/70",
    priceGradient: "from-primary to-primary/70",
    features: [
      "Acesso a todos os agentes especializados",
      "Acesso multiplataforma (Web e WhatsApp)",
      "10.000 mensagens",
      "60 minutos de áudio",
      "500 imagens geradas",
      "Suporte via e-mail",
      "7 dias de teste grátis",
      "Uso comercial / agências e empresas",
    ],
    badge: "O mais escolhido",
    isPopular: true,
    color: "primary",
  },
  {
    id: "enterprise",
    title: "Plano Enterprise",
    description: "Para agências e grandes empresas",
    price: "Consultar",
    icon: Crown,
    iconGradient: "from-secondary to-secondary/70",
    titleGradient: "from-secondary to-secondary/70",
    priceGradient: "from-secondary to-secondary/70",
    features: [
      "Acesso a todos os agentes especializados",
      "Acesso multiplataforma (Web e WhatsApp)",
      "100.000 mensagens",
      "120 minutos de áudio",
      "1000 imagens geradas",
      "Dashboard para gerenciamento de equipe",
      "Suporte via e-mail",
      "7 dias de teste grátis",
      "Uso comercial / agências e empresas",
    ],
    color: "secondary",
  },
];
