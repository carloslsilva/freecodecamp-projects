import { useEffect } from 'react'
import { calculatorButtons } from './calculator-buttons'

export function useCalculatorKeyPress() {
  useEffect(() => {
    const handleKeyPress = event => {
      const key = event.key.toUpperCase()
      switch (key) {
        case '9':
        case '7':
        case '8':
        case '6':
        case '5':
        case '4':
        case '3':
        case '2':
        case '1':
        case '0':
        case '.':
          document
            .getElementById(calculatorButtons.find(e => e.text === key)?.id)
            .click()
          break
        case '/':
          document.getElementById('divide').click()
          break
        case '*':
          document.getElementById('multiply').click()
          break
        case '-':
          document.getElementById('subtract').click()
          break
        case '+':
          document.getElementById('add').click()
          break
        case 'ENTER':
          document.getElementById('equals').click()
          break
        case 'ESCAPE':
          document.getElementById('clear').click()
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])
}
