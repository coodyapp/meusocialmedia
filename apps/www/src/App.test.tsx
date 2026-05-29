import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { App } from "./App";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
    expect(container.firstChild).not.toBeNull();
  });
});
