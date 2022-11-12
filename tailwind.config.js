/** @type {import('tailwindcss').Config} */
module.exports = {

  important: true,

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yazi : {
          'acik' : '#FFF7E9',
        },
        soru : {
          'koyu' : '#1746A2',
}
      }
    },
  },
  plugins: [

  ],
}
