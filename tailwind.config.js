/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'main': ['"Roboto Slab"', 'serif'],
    },
    extend: {
      colors: {
        primary: {
          color: "var(--md-sys-color-primary)",
          container: "var(--md-sys-color-primary-container)"
        },
        secondary: {
          color: "var(--md-sys-color-secondary)",
          container: "var(--md-sys-color-secondary-container)"
        },
        tertiary: {
          color: "var(--md-sys-color-tertiary)",
          container: "var(--md-sys-color-tertiary-container)"
        },
        error: {
          color: "var(--md-sys-color-error)",
          container: "var(--md-sys-color-error-container)"
        },
        background: "var(--md-sys-color-background)",
        surface: {
          color: "var(--md-sys-color-surface)",
          bright: "var(--md-sys-color-surface-bright)",
          
        }
      }
    },
  },
  plugins: [],
}

