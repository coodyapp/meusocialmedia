import type React from "react";
import { Bot, Sparkles, MessageSquare, ImageIcon, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  animationDelay: number;
  animationDuration: number;
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const icons = [Bot, Sparkles, MessageSquare, ImageIcon, Zap];
    const newElements: FloatingElement[] = [];

    for (let i = 0; i < 12; i++) {
      newElements.push({
        id: i,
        icon: icons[i % icons.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 3 + Math.random() * 4,
      });
    }

    setElements(newElements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => {
        const Icon = element.icon;
        return (
          <div
            key={element.id}
            className="absolute opacity-20 dark:opacity-30 animate-float"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.animationDelay}s`,
              animationDuration: `${element.animationDuration}s`,
            }}
          >
            <Icon className="h-8 w-8 text-primary transition-all duration-300 hover:scale-110" />
          </div>
        );
      })}
    </div>
  );
}
