import { useState } from 'react'
import {
  getDigitValueFromId,
  isDigitButton,
  isOperatorButton
} from '../../lib/calculator-buttons'
import { ButtonPad } from './ButtonPad'
import { Display } from './Display'

const MAX_DIGITS = 16
const MAX_INTEGER_ON_DISPLAY = 999999999999999
const MIN_FLOAT_ON_DISPLAY = 0.0000000000001
const DIGITS_AFTER_DECIMAL = 14
const FRACTION_DIGITS = 10

const initialState = {
  accumulator: 0,
  input: '',
  display: '0',
  operator: undefined
}

export const Calculator = () => {
  const [state, setState] = useState(initialState)

  const handleDigit = digit => {
    let input = state.input

    if (input.length >= MAX_DIGITS) {
      return
    }

    if (input.length >= MAX_DIGITS - 1 && digit === '.') {
      return
    }

    if (input.includes('.') && digit === '.') {
      return
    }

    if (digit === '.') {
      input = input === '' ? '0.' : input.concat(digit)
    } else {
      input = input === '0' ? digit : input.concat(digit)
    }

    return input
  }

  const handleOperator = (accumulator, input, operator) => {}

  const handleClick = e => {
    const id = e.currentTarget.id

    if (id === 'clear') {
      setState(initialState)
    } else if (isDigitButton(id)) {
      const input = handleDigit(getDigitValueFromId(id))
      if (input !== undefined) {
        setState({ ...state, input, display: input })
      }
    } else if (isOperatorButton(id)) {
    }
  }

  return (
    <div className='rounded-md border-[1px] border-alpha px-4 pb-4 pt-9'>
      <Display operator={state.operator} value={state.display} />
      <ButtonPad onClick={handleClick} />
    </div>
  )
}
