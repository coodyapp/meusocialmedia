import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface BrandLogoProps {
  variant?: "horizontal" | "vertical" | "symbol";
  className?: string;
  width?: number;
  height?: number;
}

export function BrandLogo({
  variant = "horizontal",
  className = "",
  width,
  height,
}: BrandLogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`bg-muted rounded ${className}`} style={{ width, height }} />;
  }

  const getLogoSrc = () => {
    const isDark = theme === "dark";

    switch (variant) {
      case "horizontal":
        return isDark ? "/images/logo-horizontal-light.png" : "/images/logo-horizontal-dark.png";
      case "vertical":
        return isDark ? "/images/logo-vertical-light.png" : "/images/logo-vertical-dark.png";
      case "symbol":
        return "/images/logo-symbol.png";
      default:
        return isDark ? "/images/logo-horizontal-light.png" : "/images/logo-horizontal-dark.png";
    }
  };

  const getDefaultDimensions = () => {
    switch (variant) {
      case "horizontal":
        return { width: width || 200, height: height || 60 };
      case "vertical":
        return { width: width || 120, height: height || 120 };
      case "symbol":
        return { width: width || 40, height: height || 40 };
      default:
        return { width: width || 200, height: height || 60 };
    }
  };

  const dimensions = getDefaultDimensions();

  return (
    <img
      src={getLogoSrc()}
      alt="meu Social media"
      width={dimensions.width}
      height={dimensions.height}
      className={className}
    />
  );
}
