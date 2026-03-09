/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-gradient": "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
      },

      colors: {
        // texts
        primary: "#FFCC21",
        primaryLight: "#FFE17A",
        primaryDark: "#DBA800",
        placeholder: "#BCBEC0",
        greyText: "#C9C9C9",
        sidebarOptionText: "#8A919A",
        headingText: "#1a1a2e",
        filterHeading: "#A1A5B7",
        errorText: "#E10000",
        successText: "#50CD89",
        paginationText: "#6E6B7B",

        // bg colors
        sidebarBackground: "#0C0C0C",
        tableButtonBackground: "#F1F1F2",
        paginationBackground: "#F3F2F7",
        deletecolor: "#C60000",
        greyTag: "#F6F6F6",
        cardBg: "#FFFDF5",
        primaryBackground: "#FFFFFF",
      },

      boxShadow: {
        'card': '0 2px 16px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 30px 0 rgba(0, 0, 0, 0.12)',
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(255, 204, 33, 0.15)',
        'input-focus': '0 0 0 3px rgba(255, 204, 33, 0.15)',
      }
    },
  },
  plugins: [],
};
