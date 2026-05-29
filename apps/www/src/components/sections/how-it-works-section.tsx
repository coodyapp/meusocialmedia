import { useState, useMemo, useCallback } from "react";

// Move static data outside component to prevent re-creation on each render
const STEPS_DATA = [
  {
    step: "1",
    title: "Conte sobre o seu negócio",
    description: "Nos diga o nome da sua empresa, o que você vende e pra quem.",
    image: "/images/step-1.png",
  },
  {
    step: "2",
    title: "Receba sugestões criativas no WhatsApp",
    description: "Ideias personalizadas, adaptadas ao seu público e prontas pra você usar.",
    image: "/images/step-2.png",
  },
  {
    step: "3",
    title: "Poste com mais frequência",
    description: "Mantenha sua rede ativa, mesmo com agenda.",
    image: "/images/step-3.png",
  },
] as const;

export function HowItWorksSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredCard(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const stepCards = useMemo(() => {
    return STEPS_DATA.map((item, index) => (
      <StepCard
        key={item.step}
        item={item}
        index={index}
        isHovered={hoveredCard === index}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      />
    ));
  }, [hoveredCard, handleMouseEnter, handleMouseLeave]);

  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 scroll-mt-16 relative overflow-hidden"
    >
      <div className="container relative px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Como funciona?</h2>
            <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Postar nas redes sociais não precisa ser difícil. Receba ideias prontas de conteúdo
              direto no seu WhatsApp – rápido, personalizado e mais barato que uma agência
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">{stepCards}</div>
      </div>
    </section>
  );
}

interface StepCardProps {
  item: (typeof STEPS_DATA)[0];
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function StepCard({ item, index, isHovered, onMouseEnter, onMouseLeave }: StepCardProps) {
  return (
    <div
      className="relative group duration-300 h-full"
      style={{ animationDelay: `${index * 200}ms` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Glass morphism card with fixed height */}
      <div className="glass-morphism border-0 backdrop-blur-xl bg-background/10 dark:bg-background/5 rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl h-full flex flex-col">
        {/* Step Image with number overlay */}
        <div className="relative h-64 md:h-72 overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={`Step ${item.step}`}
            className="object-cover w-full h-full transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-secondary/40 to-secondary/10" />

          {/* Step number */}
          <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-[#00c3e3] to-[#00a8c7] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">{item.step}</span>
          </div>
        </div>

        {/* Content with glass morphism background */}
        <div className="p-6 md:p-8 bg-background/20 backdrop-blur-sm flex-1 flex flex-col">
          <div className="relative">
            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3 line-clamp-2">
              {item.title}
            </h3>
          </div>

          <div className="relative flex-1">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed line-clamp-3">
              {item.description}
            </p>

            {isHovered && item.description.length > 80 && (
              <div className="absolute -bottom-16 left-0 right-0 bg-black/90 text-white text-sm p-3 rounded-lg z-50 opacity-0">
                {item.description}
              </div>
            )}
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      </div>
    </div>
  );
}
