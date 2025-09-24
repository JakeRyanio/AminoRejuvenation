import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			// Amino Rejuvenation Brand Colors - Updated from Brand Guidelines
  			brand: {
  				'light-mint': '#E1EDEC',    // Primary light background
  				'sage-green': '#979D99',    // Secondary accent
  				'lavender-gray': '#A5A4B5', // Neutral complement
  				'dusty-rose': '#CFADAF',    // Warm accent
  				'deep-mauve': '#7C5A66',    // Dark accent
  				// Extended palette for design flexibility
  				'50': '#E1EDEC',   // Light mint
  				'100': '#D1E5E3',  // Very light mint
  				'200': '#B3D5D2',  // Soft mint
  				'300': '#8BC5C0',  // Medium mint
  				'400': '#5BA8A1',  // Sage green
  				'500': '#979D99',  // Muted sage green
  				'600': '#7A8A7C',  // Darker sage
  				'700': '#5F6B61',  // Deep sage
  				'800': '#4A544B',  // Dark sage
  				'900': '#3A423B',  // Very dark sage
  			},
			lavender: {
				'lavender-gray': '#A5A4B5', // Primary accent color
				'50': '#F5F4F6',   // Very pale lavender
				'100': '#E8E6EA',  // Light lavender
				'200': '#D4D1D8',  // Soft lavender
				'300': '#A5A4B5',  // Muted lavender
				'400': '#8B8A9A',  // Medium lavender
				'500': '#7A7988',  // Base lavender
				'600': '#6B6A78',  // Darker lavender
				'700': '#5C5B68',  // Deep lavender
				'800': '#4D4C58',  // Dark lavender
				'900': '#3E3D48',  // Very dark lavender
			},
  			rose: {
  				'dusty-rose': '#CFADAF',    // Primary rose color
  				'deep-mauve': '#7C5A66',    // Dark accent
  				'50': '#F7F2F3',   // Very pale rose
  				'100': '#EDE2E4',  // Light rose
  				'200': '#DCC5C8',  // Soft rose
  				'300': '#CFADAF',  // Dusty rose
  				'400': '#C2999C',  // Medium rose
  				'500': '#B58589',  // Base rose
  				'600': '#A87176',  // Darker rose
  				'700': '#9B5D63',  // Deep rose
  				'800': '#7C5A66',  // Muted plum
  				'900': '#6B4D57',  // Very dark plum
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
