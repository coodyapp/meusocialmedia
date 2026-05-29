
export function ModernBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10 animate-gradient-slow" />

      {/* Secondary gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/3 to-accent/5 animate-gradient-reverse" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20" />
    </div>
  );
}
