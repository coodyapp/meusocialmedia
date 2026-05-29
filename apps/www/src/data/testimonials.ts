export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  metric: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Maria Silva",
    role: "Influenciadora Fitness",
    content:
      "O agente de fitness criou conteúdo incrível que aumentou meu engajamento em 300%! Economizo 5 horas por semana e meus seguidores adoram as dicas personalizadas.",
    rating: 5,
    avatar: "MS",
    metric: "+300% engajamento",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "João Santos",
    role: "Empreendedor",
    content:
      "Os posts gerados pelo agente de negócios são profissionais e convertem muito bem. Minha empresa cresceu 150% em apenas 3 meses usando as estratégias sugeridas.",
    rating: 5,
    avatar: "JS",
    metric: "+150% crescimento",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Ana Costa",
    role: "Dona de Restaurante",
    content:
      "Desde que uso o agente de gastronomia, meu restaurante nunca teve tantos clientes! As sugestões de posts são criativas e sempre geram comentários e compartilhamentos.",
    rating: 5,
    avatar: "AC",
    metric: "+200% clientes",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Carlos Mendes",
    role: "Coach de Vendas",
    content:
      "A IA entende perfeitamente meu público e cria conteúdo que realmente conecta. Meus leads aumentaram 400% e o engajamento está nas alturas!",
    rating: 5,
    avatar: "CM",
    metric: "+400% leads",
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Beatriz Lima",
    role: "Consultora de Beleza",
    content:
      "Nunca pensei que uma IA pudesse entender tanto sobre beleza quanto o agente especializado. Minhas vendas online triplicaram em 2 meses!",
    rating: 5,
    avatar: "BL",
    metric: "+300% vendas",
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "Ricardo Souza",
    role: "Personal Trainer",
    content:
      "O conteúdo gerado é tão autêntico que meus alunos nem percebem que é criado por IA. Consegui dobrar minha base de clientes em apenas 3 meses!",
    rating: 5,
    avatar: "RS",
    metric: "+200% alunos",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Fernanda Oliveira",
    role: "Dentista",
    content:
      "A IA criou conteúdo educativo perfeito para meus pacientes. Minha agenda está sempre lotada e recebo muitos elogios pelo conteúdo nas redes sociais.",
    rating: 5,
    avatar: "FO",
    metric: "+180% agendamentos",
    color: "from-teal-500 to-cyan-500",
  },
  {
    name: "Pedro Almeida",
    role: "Arquiteto",
    content:
      "Os posts sobre arquitetura ficaram lindos! Consegui mais de 50 novos clientes em 2 meses através das redes sociais. A qualidade do conteúdo é impressionante.",
    rating: 5,
    avatar: "PA",
    metric: "+50 novos clientes",
    color: "from-slate-500 to-gray-500",
  },
  {
    name: "Camila Rocha",
    role: "Nutricionista",
    content:
      "O agente entende nutrição melhor que muitos profissionais! Meus seguidores adoram as dicas e receitas. Triplicou minha base de pacientes online.",
    rating: 5,
    avatar: "CR",
    metric: "+300% pacientes",
    color: "from-lime-500 to-green-500",
  },
  {
    name: "Lucas Ferreira",
    role: "Fotógrafo",
    content:
      "Consegui mostrar meu trabalho de forma única. As legendas criadas pela IA são poéticas e profissionais. Aumentei meus contratos em 250%!",
    rating: 5,
    avatar: "LF",
    metric: "+250% contratos",
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Gabriela Santos",
    role: "Psicóloga",
    content:
      "Conteúdo sensível e educativo sobre saúde mental. Minha agenda ficou cheia e recebo muitas mensagens de agradecimento dos seguidores.",
    rating: 5,
    avatar: "GS",
    metric: "+400% consultas",
    color: "from-violet-500 to-purple-500",
  },
  {
    name: "Rafael Silva",
    role: "Veterinário",
    content:
      "Posts sobre cuidados com pets que realmente engajam! Minha clínica nunca teve tanto movimento. A IA entende perfeitamente o mundo pet.",
    rating: 5,
    avatar: "RS",
    metric: "+320% movimento",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Juliana Costa",
    role: "Professora de Yoga",
    content:
      "Conteúdo zen e inspirador que meus alunos amam. Consegui triplicar minhas aulas online e presenciais em apenas 6 semanas!",
    rating: 5,
    avatar: "JC",
    metric: "+300% aulas",
    color: "from-indigo-500 to-blue-500",
  },
  {
    name: "Diego Martins",
    role: "Chef de Cozinha",
    content:
      "Receitas e dicas culinárias que fazem sucesso! Meu restaurante está sempre cheio e recebi proposta para programa de TV.",
    rating: 5,
    avatar: "DM",
    metric: "+500% visibilidade",
    color: "from-red-500 to-pink-500",
  },
  {
    name: "Larissa Moreira",
    role: "Advogada",
    content:
      "Conteúdo jurídico acessível que educa e atrai clientes. Meu escritório cresceu 200% e me tornei referência na área.",
    rating: 5,
    avatar: "LM",
    metric: "+200% clientes",
    color: "from-blue-600 to-indigo-600",
  },
  {
    name: "Thiago Pereira",
    role: "Mecânico",
    content:
      "Dicas automotivas que realmente ajudam as pessoas. Minha oficina está sempre lotada e virei influenciador do setor!",
    rating: 5,
    avatar: "TP",
    metric: "+600% clientes",
    color: "from-gray-600 to-slate-600",
  },
  {
    name: "Aline Barbosa",
    role: "Fisioterapeuta",
    content:
      "Exercícios e dicas de reabilitação que fazem diferença. Minha clínica expandiu para 3 unidades em 6 meses!",
    rating: 5,
    avatar: "AB",
    metric: "+300% expansão",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Gustavo Lima",
    role: "Contador",
    content:
      "Simplificou temas complexos de contabilidade. Aumentei minha carteira de clientes em 400% e me tornei consultor requisitado.",
    rating: 5,
    avatar: "GL",
    metric: "+400% carteira",
    color: "from-green-600 to-emerald-600",
  },
  {
    name: "Patricia Gomes",
    role: "Corretora de Imóveis",
    content:
      "Posts sobre mercado imobiliário que geram leads qualificados. Vendi 300% mais imóveis este ano comparado ao anterior!",
    rating: 5,
    avatar: "PG",
    metric: "+300% vendas",
    color: "from-yellow-500 to-amber-500",
  },
  {
    name: "Marcelo Santos",
    role: "Engenheiro",
    content:
      "Conteúdo técnico acessível que atrai projetos. Triplicou meus contratos de consultoria e agora sou palestrante em eventos.",
    rating: 5,
    avatar: "MS",
    metric: "+300% contratos",
    color: "from-slate-500 to-zinc-500",
  },
];
