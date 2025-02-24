import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
  	    extend: {
  		    colors: {
  		        brand: {
  		            100: '#FFF9EA',
  		            200: '#FFE7AD',
  		            300: '#EFBD6F',
  		            400: '#D29A39',
  		            500: '#A06B00',
  		            600: '#48381F'
  		        },
  		        'brand-dark': {
                    100: '#2A2114',
  		            200: '#433114',
  		            300: '#664D25',
  		            400: '#D29A39',
  		            500: '#E3B46B',
  		            600: '#F6E1C3'
  		        },
  		        'brand-secondary': {
  		            100: '#F2F1FF',
  		            200: '#DEDAFF',
  		            300: '#BEB7F5',
  		            400: '#BEB7F5',
                    500: '#2F235A',
                    600: '#31265D'
  		        },
  		        'brand-secondary-dark': {
  		            100: '#26233C',
  		            200: '#3C3561',
  		            300: '#544D7F',
  		            400: '#BEB7F5',
                    500: '#B4ADEB',
                    600: '#E1E0F5'
  		        },
  		        'brand-ternary': {
  		            100: '#E1F7F6',
  		            200: '#BBE9E7',
  		            300: '#89CCCA',
                    400: '#34A2A1',
                    500: '#007E7C',
                    600: '#153C3B'
  		        },
  		        'brand-ternary-dark': {
  		            100: '#122C2C',
  		            200: '#164646',
  		            300: '#296766',
                    400: '#34A2A1',
                    500: '#66CECC',
                    600: '#B0EDEC'
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
  		    }
  	    }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
