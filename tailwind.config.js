/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        /* Base */
        primary:          "hsl(var(--color-primary) / <alpha-value>)",
        secondary:        "hsl(var(--color-secondary) / <alpha-value>)",
        surface:          "hsl(var(--color-primary-surface) / <alpha-value>)",
        dark:             "hsl(var(--color-primary-dark) / <alpha-value>)",

        /* Accents */
        accent: {
          primary:   "hsl(var(--accent-primary) / <alpha-value>)",
          secondary: "hsl(var(--accent-secondary) / <alpha-value>)",
          tertiary:  "hsl(var(--accent-tertiary) / <alpha-value>)",
          glow:      "hsl(var(--accent-glow) / <alpha-value>)",
        },

        /* Utility */
        border:    "hsl(var(--color-border) / <alpha-value>)",
        muted:     "hsl(var(--color-muted) / <alpha-value>)",
        overlay:   "hsl(var(--color-overlay) / <alpha-value>)",
      },

      fontFamily: {
        sans:    ["Nunito", "sans-serif"],   // body
        heading: ["Caprasimo", "serif"],     // headings
      },

      borderRadius: {
        xl2: "14px",
      },

      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,.06)",
      },
    },
  },
  plugins: [],
}
