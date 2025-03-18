import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     keyframes : {
      slidein : {
        from : {
          opacity : "0",
          transform : "translateY(-10px)",
        },
        to :{
          opacity : "1",
          transform : "translate(0)"
        },
      },
     },
     animation : {
        slidein200ms : "slidein 1s ease-in-out 300ms forwards",
        slidein500ms : "slidein 3s ease 500ms forwards",
        slidein700ms : "slidein 4s ease 700ms forwards",
        slidein900ms : "slidein 5s ease 900ms forwards",
      },
      spacing :{
        '84': '21rem',
        '88' : '22rem',
        '92' : '23rem',
        '100' : '25rem',
        '104' : '26rem',
        '108' : '27rem',
        '110' : '28rem',
        '112' : '29rem',
        '114' : '30rem',
        '116' : '31rem',
        '118' : '32rem',
        '120' : '33rem',
        
        'attchmentWidth' : '50rem',
        'attchmentHeigth' : '42rem',
        'RoomCarWidth' : '31rem'
      }
    },
  },
  plugins: [
    require('@shrutibalasa/tailwind-grid-auto-fit')
  ],
}

