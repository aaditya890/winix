/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",   // Angular templates & components
  ],
  darkMode: 'class',          // optional: prevents extra dark selectors
  theme: {
    extend: {
      colors: {
        // Base
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        surface: "hsl(var(--color-primary-surface) / <alpha-value>)",
        dark: "hsl(var(--color-primary-dark) / <alpha-value>)",

        // Accents
        accent: {
          primary: "hsl(var(--accent-primary) / <alpha-value>)",
          secondary: "hsl(var(--accent-secondary) / <alpha-value>)",
          tertiary: "hsl(var(--accent-tertiary) / <alpha-value>)",
          glow: "hsl(var(--accent-glow) / <alpha-value>)",
        },

        // Utility
        border: "hsl(var(--color-border) / <alpha-value>)",
        muted: "hsl(var(--color-muted) / <alpha-value>)",
        overlay: "hsl(var(--color-overlay) / <alpha-value>)",

        // Aliases
        pri: "hsl(var(--accent-primary) / <alpha-value>)",
        "pri-2": "hsl(var(--accent-secondary) / <alpha-value>)",
      },

      // Gradients via CSS vars
      backgroundImage: {
        hero: "var(--gradient-hero)",
        accent: "var(--gradient-accent)",
      },

      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },

      borderRadius: { xl2: "14px" },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.06)" },

      // Animations
      animation: {
        marquee: "marquee 18s linear infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
  // 👇 add this part to improve purge + remove unused CSS
  safelist: [
    'text-white', 'bg-[#050518]', 'hover:text-white',
    'flex', 'sm:flex-row', 'justify-center', 'items-center',
  ],
};
