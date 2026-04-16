/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: "var(--font-playfair), serif",
        poppins: "var(--font-poppins), sans-serif",
      },
      colors: {
        primary: {
          50: "var(--color-sky-50)",
          100: "var(--color-sky-100)",
          200: "var(--color-sky-200)",
          300: "var(--color-sky-300)",
          400: "var(--color-sky-400)",
          500: "var(--color-sky-500)",
          600: "var(--color-sky-600)",
          700: "var(--color-sky-700)",
          800: "var(--color-sky-800)",
          900: "var(--color-sky-900)",
        },
      },
    },
  },
  plugins: [],
};
