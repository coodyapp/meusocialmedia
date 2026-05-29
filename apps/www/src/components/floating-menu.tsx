import { useState, useEffect } from "react";
import { LogIn, ChevronLeft, ChevronRight } from "lucide-react";

interface FloatingMenuProps {
  onScrollToSection: (sectionId: string) => void;
}

export function FloatingMenu({ onScrollToSection }: FloatingMenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "how-it-works", label: "Como Funciona" },
    { id: "features", label: "Recursos" },
    { id: "pricing", label: "Preços" },
    { id: "testimonials", label: "Depoimentos" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contato" },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);

      const sections = [
        "home",
        "how-it-works",
        "features",
        "pricing",
        "testimonials",
        "faq",
        "contact",
      ];
      const sectionElements = sections.map((id) => document.getElementById(id));

      let currentSection = "home";
      let currentIndex = 0;

      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = sections[index];
            currentIndex = index;
          }
        }
      });

      setActiveSection(currentSection);
      setActiveMobileIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateMobile = (direction: "prev" | "next") => {
    let newIndex = activeMobileIndex;

    if (direction === "prev") {
      newIndex = activeMobileIndex > 0 ? activeMobileIndex - 1 : menuItems.length - 1;
    } else {
      newIndex = activeMobileIndex < menuItems.length - 1 ? activeMobileIndex + 1 : 0;
    }

    setActiveMobileIndex(newIndex);
    const targetItem = menuItems[newIndex];

    if (targetItem && targetItem.id === "home") {
      scrollToTop();
    } else if (targetItem) {
      onScrollToSection(targetItem.id);
    }
  };

  if (!isVisible) return null;

  if (isMobile) {
    return (
      <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4">
        <div className="glass-morphism bg-background/20 dark:bg-background/10 backdrop-blur-xl border border-primary/20 rounded-xl px-3 py-2 shadow-lg animate-in fade-in duration-500">
          <div className="flex items-center justify-between space-x-3">
            <button
              onClick={() => navigateMobile("prev")}
              className="glass-morphism bg-primary/20 hover:bg-primary/30 rounded-lg p-1.5 transition-all duration-300 hover:scale-110 border border-primary/30"
            >
              <ChevronLeft className="h-4 w-4 text-primary" />
            </button>

            <button
              onClick={() => navigateMobile("next")}
              className="glass-morphism bg-primary/20 hover:bg-primary/30 rounded-lg p-1.5 transition-all duration-300 hover:scale-110 border border-primary/30"
            >
              <ChevronRight className="h-4 w-4 text-primary" />
            </button>

            <div className="h-8 w-px bg-primary/30" />

            <a href="/login">
              <button className="flex items-center space-x-1 py-1.5 px-2 rounded-lg glass-morphism bg-background/20 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-300">
                <LogIn className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Entrar</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center">
      <div className="glass-morphism bg-background/20 dark:bg-background/10 backdrop-blur-xl rounded-2xl px-3 py-2 border border-primary/20 shadow-2xl animate-in fade-in duration-500 max-w-[95vw]">
        <div className="flex items-center space-x-2 min-w-max">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "home") {
                    scrollToTop();
                  } else {
                    onScrollToSection(item.id);
                  }
                }}
                className={`
                  relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary group"}
                `}
              >
                <span>{item.label}</span>
                <div
                  className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                    isActive ? "w-4/5" : "w-0 group-hover:w-4/5"
                  }`}
                />
              </button>
            );
          })}

          <div className="h-6 w-px bg-primary/30 mx-2" />

          <a href="/login">
            <button className="flex items-center px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all duration-300 whitespace-nowrap">
              <LogIn className="h-4 w-4 mr-2" />
              <span>Entrar</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
