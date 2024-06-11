/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },

        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }  
        },
        blinkk: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }  
        }
      },
      colors:{
        'blck' : '#111315',
        'offblck' : '#30353C',
        'blu' : '#2A86FF',
        'offblu' : '#8EBBFF',
        'oxblu' : '#0A2342',
        'bblu' :'#0b1623',
        'purp' :'#5251A4',
        'spacecadet' : '#1D3461',
        'charcole' :'#36454F',
        'charco' : '#2E4053',
        'yello':'#F4D03F',
        'blcksh':'#212F3D'
  
      },
      fontFamily:{
        poppins : ["Poppins"]
      }
    },
  },
  plugins: [],
}
