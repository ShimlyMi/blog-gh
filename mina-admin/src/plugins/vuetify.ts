/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/styles/index.scss'

// Composables
import {createVuetify, ThemeDefinition} from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
// export default createVuetify({
//   theme: {
//     defaultTheme: 'light',
//   },
// })


const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#fff',
    surface: '#fff',
    primary: '#a7a7d4',
    'primary-darken-1': '#e6cff7',
    secondary: '#e1e5fe',
    'secondary-darken-1': '#e1e5fe',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 2,
    },
    themes: {
      myCustomLightTheme,
    },
  },
})
