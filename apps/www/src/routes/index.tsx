import { useState } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FloatingMenu } from "@/components/floating-menu";
import { Footer } from "@/components/footer";
import { DemoModal } from "@/components/demo-modal";
import { StripeCheckout } from "@/components/stripe-checkout";
import { PricingPlan } from "@/data/pricing-plans";

export function LandingPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStartNow = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  return (
    <main className="relative min-h-screen">
      <FloatingMenu onScrollToSection={scrollToSection} />

      <HeroSection
        onScrollToSection={scrollToSection}
        onOpenDemo={() => setIsDemoOpen(true)}
      />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection onStartNow={handleStartNow} />
      <TestimonialsSection onStartNow={handleStartNow} />
      <FAQSection onScrollToSection={scrollToSection} />
      <ContactSection />

      <Footer />

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      {selectedPlan && (
        <StripeCheckout
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            setSelectedPlan(null);
          }}
          plan={selectedPlan}
        />
      )}
    </main>
  );
}
