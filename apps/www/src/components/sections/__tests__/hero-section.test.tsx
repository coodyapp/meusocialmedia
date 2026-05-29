import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeroSection } from "../hero-section";

// Mock next-themes since it requires a provider
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
}));

describe("HeroSection", () => {
  const mockScrollToSection = vi.fn();
  const mockOpenDemo = vi.fn();

  it("renders the main heading", () => {
    render(
      <HeroSection
        onScrollToSection={mockScrollToSection}
        onOpenDemo={mockOpenDemo}
      />,
    );

    // Check for main heading text
    expect(screen.getByText("Agentes de IA")).toBeInTheDocument();
    expect(screen.getByText("para Social Media")).toBeInTheDocument();
  });

  it("renders the CTA buttons", () => {
    render(
      <HeroSection
        onScrollToSection={mockScrollToSection}
        onOpenDemo={mockOpenDemo}
      />,
    );

    expect(screen.getByText("Ver planos")).toBeInTheDocument();
    expect(screen.getByText("Demonstração")).toBeInTheDocument();
  });

  it("calls onScrollToSection when 'Ver planos' button is clicked", () => {
    render(
      <HeroSection
        onScrollToSection={mockScrollToSection}
        onOpenDemo={mockOpenDemo}
      />,
    );

    screen.getByText("Ver planos").click();
    expect(mockScrollToSection).toHaveBeenCalledWith("pricing");
  });

  it("calls onOpenDemo when 'Demonstração' button is clicked", () => {
    render(
      <HeroSection
        onScrollToSection={mockScrollToSection}
        onOpenDemo={mockOpenDemo}
      />,
    );

    screen.getByText("Demonstração").click();
    expect(mockOpenDemo).toHaveBeenCalled();
  });
});
