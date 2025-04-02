/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        'sxs': '340px',  
        'xs': '390px',  
        'xsm': '550px',  
        'sm': '640px', 
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px', 
        '2bxl': '1600px', 
        '3xl': '1920px',  
      },
      fontFamily: {
        'RobotoSlab': ['"Roboto Slab"', 'serif'],
        'MadeCanvas': ['MadeCanvas', 'sans-serif'],
      },
    },
  },
  plugins: [],
}