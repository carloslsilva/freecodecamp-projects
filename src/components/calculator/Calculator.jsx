import { useCalculator } from '@/hooks/useCalculator'
import { useCalculatorKeyPress } from '@/hooks/useCalculatorKeyPress'
import { ButtonPad } from './ButtonPad'
import { Display } from './Display'

export const Calculator = () => {
  const { handleClick, display, operator } = useCalculator()
  useCalculatorKeyPress()

  return (
    <div className='rounded-md border-[1px] border-alpha px-4 pb-4 pt-9'>
      <Display operator={operator} value={display} />
      <ButtonPad onClick={handleClick} />
    </div>
  )
}
