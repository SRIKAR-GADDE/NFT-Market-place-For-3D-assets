/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        black: "#000",
        mediumseagreen: {
          100: "rgba(0, 164, 96, 0.2)",
          200: "rgba(0, 164, 96, 0.99)",
        },
        tomato: {
          100: "#ff6b2f",
          200: "rgba(254, 107, 54, 0.25)",
          300: "rgba(254, 107, 54, 0.1)",
          400: "rgba(255, 107, 47, 0.25)",
          500: "rgba(255, 100, 90, 0.2)",
          600: "rgba(255, 100, 90, 0.99)",
        },
        lightskyblue: "rgba(134, 178, 231, 0.42)",
        "croc-primary-white": "#fff",
        deepskyblue: "#08c4ff",
        tan: "#d7c19a",
        chocolate: {
          100: "#cc6228",
          200: "#c35224",
          300: "rgba(195, 82, 36, 0.25)",
          400: "rgba(195, 82, 36, 0.1)",
          500: "rgba(195, 82, 36, 0.15)",
        },
        coral: {
          100: "#de6b3d",
          200: "rgba(222, 107, 61, 0.25)",
          300: "rgba(222, 107, 61, 0.09)",
        },
        gray: {
          100: "#161616",
          200: "rgba(8, 11, 20, 0.7)",
          300: "rgba(255, 255, 255, 0.1)",
          400: "rgba(255, 255, 255, 0.5)",
          500: "rgba(6, 19, 45, 0)",
        },

        orangered: {
          100: "#e65214",
          200: "rgba(230, 82, 20, 0.09)",
          300: "rgba(230, 82, 20, 0.25)",
        },
        "background-secondary": "#3b3b3b",
        darkgray: "#b9afaf",
        dimgray: {
          100: "#534a4a",
          200: "#5c4242",
        },
      },
      spacing: {},
      fontFamily: {
        "ubuntu-mono": "'Ubuntu Mono'",
        "segoe-ui": "'Segoe UI'",
        "basebody-work-sans": "'Work Sans'",
        "caption-space-mono": "'Space Mono'",
        roboto: "Roboto",
        lato: "Lato",
      },
      borderRadius: {
        "68xl-5": "87.5px",
        "123xl": "142px",
        "520xl-9": "539.9px",
        xl: "20px",
        "5xs-4": "7.4px",
        "11xl": "30px",
        mini: "15px",
        "14xl-5": "33.5px",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
        meteor: "meteor 5s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
