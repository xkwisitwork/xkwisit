import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      "mobile-sm": "320px",
      "mobile-md": "375px",
      "mobile-lg": "425px",
      tablet: "768px",
      laptop: "1024px",
      "laptop-lg": "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
      },
      screens: {
        "laptop-lg": "1360px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "#3B05C4",
          foreground: "#FFFFFF",
          50: "#F6F2FF",
          100: "#E9DFFF",
          200: "#D2BEFF",
          300: "#A98AFF",
          400: "#7A4DFF",
          500: "#5A2BE0",
          600: "#3B05C4",
          700: "#2C0494",
          800: "#1E0368",
          900: "#120242",
        },

        /* Brand: energy red, focal magenta, vivid blue, bold blue, white */
        accent: {
          300: "#FC3FE3",
          400: "#5B45FF",
          900: "#C40404",
        },

        focal: {
          DEFAULT: "#FC3FE3",
          soft: "#FFE8FC",
          deep: "#C412B0",
        },

        energy: {
          DEFAULT: "#C40404",
          soft: "#FDECEC",
          deep: "#8E0303",
        },

        /* Bold professional blue - primary brand action color */
        mint: {
          DEFAULT: "#3B05C4",
          foreground: "#FFFFFF",
          soft: "#F4F0FF",
          ice: "#E7DEFF",
          mid: "#5B45FF",
          deep: "#2C0494",
          ink: "#16024A",
        },

        neutral: {
          100: "#FFFFFF",
          200: "#F7F9FB",
          300: "#F2F3F5",
          400: "#EFEFEF",
          500: "#A4A4A4",
          600: "#636363",
          900: "#000000",
        },

        success: {
          DEFAULT: "#00AC4F",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#C40404",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F2F3F5",
          foreground: "#636363",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
      },

      fontSize: {
        200: ["0.6875rem", { lineHeight: "1rem" }],
        300: ["0.75rem", { lineHeight: "1.125rem" }],
        400: ["0.875rem", { lineHeight: "1.375rem" }],
        500: ["1rem", { lineHeight: "1.5rem" }],
        600: ["1.25rem", { lineHeight: "1.75rem" }],
        700: ["1.5rem", { lineHeight: "2rem" }],
        800: ["2rem", { lineHeight: "2.5rem" }],
        900: ["2.5rem", { lineHeight: "3rem" }],
      },

      fontFamily: {
        sans: ["var(--font-comfortaa)", "system-ui", "sans-serif"],
        display: ["var(--font-comfortaa)", "system-ui", "sans-serif"],
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-33.333%)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "spin-slow": "spin 10s linear infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;