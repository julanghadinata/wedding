/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      screens: {
          'xs': {'max': '375px'},
          
          'sm': '640px',
          // => @media (min-width: 640px) { small tablet / smartphone }

          'md': '768px',
          // => @media (min-width: 768px) { tablet mini, air}

          'ipadpro': {'min': '1024px', 'max': '1124px'},
          // => @media (min-width: 768px) { tablet ipad pro}

          'lg': '1124px',
          // => @media (min-width: 1024px) { 13 inch lebih macbook 13 inch}

          'xl': '1285px',
          // => @media (min-width: 1280px) { 14 inch lebih macbook 14 inch}

          '2xl': '1536px',
          // => @media (min-width: 1536px) { 16 inch lebih }
      },
      container: {
          // you can configure the container to be centered
          center: true,
          // or have default horizontal padding
          padding: '1rem',
          // default breakpoints but with 40px removed
          screens: {
            sm: '600px',
            md: '728px',
            ipadpro: '944px',
            lg: '984px',
            xl: '1200px',
            '2xl': '1440px',
          },
        },
      colors: {
        primary :"#E9A495", //salmon
        secondary:"#E5725F", //orange
      },
      fontFamily: {
        title: ['Greatvibes', 'sans-serif'],
        subtitle: ['Libre', 'sans-serif'],
        primary: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
}

