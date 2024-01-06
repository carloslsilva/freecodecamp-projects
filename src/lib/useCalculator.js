import { useState } from 'react'
import {
  getDigitValueFromId,
  isDigitButton,
  isOperatorButton
} from './calculator-buttons'

const MAX_DIGITS = 16
// const MAX_INTEGER_ON_DISPLAY = 999999999999999
// const MIN_FLOAT_ON_DISPLAY = 0.0000000000001
// const DIGITS_AFTER_DECIMAL = 14
// const FRACTION_DIGITS = 10

const initialState = {
  accumulator: 0,
  input: '',
  display: '0',
  operator: undefined
}

function handleDigit(state, digit) {
  let input = state.input

  if (input.length >= MAX_DIGITS) {
    return state
  }

  if (input.length >= MAX_DIGITS - 1 && digit === '.') {
    return state
  }

  if (input.includes('.') && digit === '.') {
    return state
  }

  if (digit === '.') {
    input = input === '' ? '0.' : input.concat(digit)
  } else {
    input = input === '0' ? digit : input.concat(digit)
  }

  return { ...state, input, display: input }
}

function handleOperator(state, operator) {
  return { ...state, operator }
}

export function useCalculator() {
  const [state, setState] = useState(initialState)

  const handleClick = e => {
    const id = e.currentTarget.id

    if (id === 'clear') {
      setState(initialState)
    } else if (isDigitButton(id)) {
      const newState = handleDigit(state, getDigitValueFromId(id))
      setState({ ...newState })
    } else if (isOperatorButton(id)) {
      const newState = handleOperator(state, id)
      setState(newState)
    }
  }

  return {
    handleClick,
    display: state.display,
    operator: state.operator
  }
}
