/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // screens: {
    //   'screen-480': '480px',
    //   // => @media (min-width: 640px) { ... }

    // },
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
        Roboto: 'Poppins'
      },
      fontSize: {
        '16': '16px',
      },
      boxShadow: {
        'card': '0px 0px 3px 2px #d5d5d5'
      },
      backgroundImage:{
        'space-1': "url('https://res.cloudinary.com/hoaitan/image/upload/v1667579328/engrow/5446451_t3ebfs.jpg')"
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(-2px) scale(1.03)' },
          '50%': { transform: 'translateY(2px) scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        PopupNotification: {
          '0%': { transform: 'translateX(20px)', opacity:'0.3' },
          '100%': { transform: 'translateX(0px)',opacity:'1' },
        },
        showRemind: {
          '0%': {opacity:0},
          '100%':{opacity:1}
        },
        hiddenRemind: {
          '0%': {opacity:1},
          '100%':{opacity:0, visibility: 'hidden'}
        },
        recordWave_1: {
          '0%, 100%':{height: '15px'},
          '50%':{height: '30px'},
        },
        recordWave_2: {
          '0%, 100%':{height: '10px'},
          '50%':{height: '20px'}
        },
        recordWave_3: {
          '0%, 100%':{height: '13px'},
          '50%':{height: '26px'}
        },
        recordWave_4: {
          '0%, 100%':{height: '15px'},
          '50%':{height: '25px'}
        },
        recordWave_5: {
          '0%, 100%':{height: '8px'},
          '50%':{height: '15px'}
        },
      },
      animation: {
        hiddenRemind: 'hiddenRemind 3s ease',
        showRemind: 'showRemind 4s ease',
        floating: 'floating 3s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        PopupNotification: 'PopupNotification 0.5s ease-in-out',
        recordWave_1:'recordWave_1 0.9s ease-in-out infinite',
        recordWave_2:'recordWave_2 1s ease-in-out infinite',
        recordWave_3:'recordWave_3 1.1s ease-in-out infinite',
        recordWave_4:'recordWave_4 1.2s ease-in-out infinite',
        recordWave_5:'recordWave_5 0.8s ease-in-out infinite',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/line-clamp'),
  ]
}
