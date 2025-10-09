import { Star } from "lucide-react";

export const DecorativeSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center p-12 space-y-12">
      {/* Logo */}
      <div className="mb-8">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            {/* Outer ring with icons */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#4CAF50", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "#2196F3", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#1A237E", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            
            {/* Inner white circle */}
            <circle cx="60" cy="60" r="38" fill="white" />
            
            {/* Text */}
            <text
              x="60"
              y="65"
              textAnchor="middle"
              className="text-lg font-bold"
              fill="#1A237E"
              style={{ fontSize: "16px" }}
            >
              GOOMYE
            </text>
          </svg>
        </div>
      </div>

      {/* Headline */}
      <h2 className="text-4xl font-bold text-foreground text-center max-w-md leading-tight">
        The easiest way to shop everything you need
      </h2>

      {/* Decorative elements */}
      <div className="relative w-full max-w-md h-96">
        {/* Profile images scattered */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
          <div className="w-full h-full bg-muted animate-pulse" />
        </div>

        <div className="absolute top-20 right-12 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
          <div className="w-full h-full bg-muted animate-pulse" />
        </div>

        <div className="absolute top-32 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 overflow-hidden">
          <div className="w-full h-full bg-muted animate-pulse" />
        </div>

        <div className="absolute top-40 right-20 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 overflow-hidden">
          <div className="w-full h-full bg-muted animate-pulse" />
        </div>

        {/* Large profile card */}
        <div className="absolute top-12 left-8 w-32 h-40 rounded-2xl bg-card shadow-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 animate-pulse" />
        </div>

        {/* Review card */}
        <div className="absolute bottom-20 left-4 w-48 h-32 rounded-2xl bg-card shadow-lg p-4 space-y-2">
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded animate-pulse" />
            <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
          </div>
          <div className="flex gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
        </div>

        {/* Phone mockup */}
        <div className="absolute bottom-4 right-8 w-32 h-40 rounded-3xl bg-card shadow-xl overflow-hidden border-4 border-foreground/10">
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};