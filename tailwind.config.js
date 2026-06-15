/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          '"SF Pro Display"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: ['"Fraunces"', '"DM Serif Display"', "Georgia", "serif"],
        editorial: ['"Fraunces"', '"DM Serif Display"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        cream: {
          50: "#faf5ec",
          100: "#f5ede0",
          200: "#ede1cc",
          300: "#dcc9a8",
          400: "#c4a87a",
        },
        ink: {
          50: "#faf5ec",
          100: "#ede1cc",
          200: "#d8c19a",
          300: "#b89968",
          400: "#7e6238",
          500: "#54401e",
          600: "#3b2c14",
          700: "#2a1f0e",
          800: "#1a1308",
          900: "#100a05",
          950: "#070403",
        },
        brand: {
          50: "#fcf2eb",
          100: "#f6dccc",
          200: "#eebb9e",
          300: "#d99570",
          400: "#c4734f",
          500: "#b15c40",
          600: "#9a4731",
          700: "#7d3826",
          800: "#5e2c1f",
          900: "#4a241a",
        },
        accent: {
          terracotta: "#c4734f",
          clay: "#a85d3f",
          mustard: "#d4a04c",
          ochre: "#c98a35",
          olive: "#7a8442",
          espresso: "#3b2c14",
          marble: "#f8f5ee",
          stone: "#d6cdb8",
          rust: "#9a4731",
          paper: "#f5ede0",
          honey: "#e6c178",
          sage: "#a8b58a",
        },
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at center, rgba(15,23,42,0.08) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.45'/></svg>\")",
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 20px 50px -20px rgba(15,23,42,0.25)",
        soft: "0 10px 40px -10px rgba(15,23,42,0.18)",
        ring: "0 0 0 1px rgba(15,23,42,0.06), 0 8px 24px -8px rgba(15,23,42,0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        gradient: "gradient 8s ease infinite",
        blob: "blob 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
