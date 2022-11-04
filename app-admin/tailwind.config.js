/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'navbar': 'white',
        'primary': '#FF6464',
        'primary-card': '#FF835C',
        'secondary-card': 'rgba(0, 115, 25, 0.8)',
        'thirdly-card': 'rgba(40, 0, 91, 0.7)',
        'form-login': '#EDE0C1'
      },
      fontFamily: {
        OpenSans: ['"Open Sans"', '"sans-serif"']
      },
      fontSize: {
        '16': '16px',
      },
      boxShadow: {
        'card': '0px 0px 5px 2px #d5d5d5'
      },
      backgroundImage:{
        'space-1': "url('https://res.cloudinary.com/hoaitan/image/upload/v1666868605/engrow/2474215_bsrlkw.jpg')"
      }
      ,
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(-2px) scale(1.03)' },
          '50%': { transform: 'translateY(2px) scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        NextSchedule: {
          '0%': { transform: 'translateY(0px)', opacity:'1' },
          '100%': { transform: 'translateY(-90px)',opacity:'1' },
        },
        PopupNotification: {
          '0%': { transform: 'translateX(20px)', opacity:'0' },
          '100%': { transform: 'translateX(0px)',opacity:'1' },
        },
        openLeftBar: {
          '0%': { transform:'translateX(-100%)', opacity:'1' },
          '100%': { transform:'translateX(0)',opacity:'1' },
        },
        closeLeftBar: {
          '0%': { display:'block', opacity:'1' },
          '100%': { display:'hidden',opacity:'0' },
        }
      },
      animation: {
        floating: 'floating 3s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        PopupNotification: 'PopupNotification 0.5s ease-in-out',
        openLeftBar: 'openLeftBar 0.5s ease-in-out',
        closeLeftBar: 'closeLeftBar 2s ease-in-out',
        NextSchedule: 'NextSchedule 1.5s ease-in-out'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}