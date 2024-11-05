// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust these paths to match your project structure
    "./index.html",
    
  ],
  theme: {
		extend: {
			fontFamily: {
				poppins: ['"Poppins"', "sans-serif"],
				koulen: ['"Koulen"', "cursive"],
			},
			fontWeight: {
				regular: 400,
				medium: 500,
				semibold: 600,
				bold: 700,
			},
			colors: {
				text: "#ddeef8",
				background: "#040a10",
				bglight: "#0a1929", 
				primary: "#8fbde5",
				secondary: "#851e63",
				accent: "#d5504d",
				top: "#020508",
				"grad-start": "#8fbde5",
				"grad-end": "#D5504D",
			},
			screens: {
				"3xl": "1920px",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		({ addUtilities }) => {
			const newUtilities = {
				".gradient-text": {
					background: "linear-gradient(to right, var(--tw-gradient-stops))",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
				},
			};
			addUtilities(newUtilities);
		},
	],
};
