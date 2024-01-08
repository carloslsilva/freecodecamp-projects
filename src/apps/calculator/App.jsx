import { ButtonPad } from './components/ButtonPad'
import { Display } from './components/Display'
import { useCalculator } from './hooks/useCalculator'
import { useCalculatorKeyPress } from './hooks/useCalculatorKeyPress'

export const App = () => {
  const { handleClick, display, operator } = useCalculator()
  useCalculatorKeyPress()
  return (
    <div className='rounded-md border-2 border-alpha px-4 pb-4 pt-9'>
      <Display operator={operator} value={display} />
      <ButtonPad onClick={handleClick} />
    </div>
  )
}
