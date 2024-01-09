import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [typography()],
  theme: {
    extend: {
      fontFamily: {
        title: ['Roboto', ...defaultTheme.fontFamily.sans],
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        display: ['Play', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        dark: '#2e3532',
        light: '#fcf9ed',
        alpha: '#665c84',
        beta: '#ffba5a',
        gamma: '#ff7657',
        'brand-linkedin': '#0077b5',
        'brand-github': '#030303',
        'brand-freecodecamp': 'darkgreen',
        'brand-twitter': '#1da1f2',
        'brand-youtube': '#ff0000'
      }
    }
  }
}
