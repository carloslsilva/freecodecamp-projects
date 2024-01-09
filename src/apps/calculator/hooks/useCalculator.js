import { useState } from 'react'
import {
  getDigitValueFromId,
  isDigitButton,
  isOperatorButton
} from '../lib/buttons'

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
  const operation = (accumulator, input, operator) => {
    let updateDisplay = false
    let error = false
    switch (operator) {
      case 'add': {
        accumulator += input
        updateDisplay = true
        break
      }
      case 'subtract': {
        accumulator -= input
        updateDisplay = true
        break
      }
      case 'multiply': {
        accumulator *= input
        updateDisplay = true
        break
      }
      case 'divide': {
        if (input !== 0) {
          accumulator /= input
          updateDisplay = true
        } else {
          error = true
        }
        break
      }
      default: {
        updateDisplay = false
        break
      }
    }

    return [accumulator, input, updateDisplay, error]
  }

  const parseAccumulator = accumulator => {
    if (Number.isInteger(accumulator)) {
      if (Math.abs(accumulator) > MAX_INTEGER_ON_DISPLAY) {
        return accumulator.toExponential(FRACTION_DIGITS)
      } else {
        return accumulator
      }
    } else {
      if (Math.abs(accumulator) < MIN_FLOAT_ON_DISPLAY) {
        return accumulator.toExponential(FRACTION_DIGITS)
      } else if (Math.abs(accumulator) < 1) {
        return parseFloat(accumulator.toFixed(DIGITS_AFTER_DECIMAL))
      } else if (accumulator.toString().length > MAX_DIGITS) {
        return accumulator.toExponential(FRACTION_DIGITS)
      } else {
        return accumulator
      }
    }
  }

  if (operator === 'clear') {
    return { ...initialState }
  }

  if (state.input === '') {
    return { ...state, operator }
  }

  let [accumulator, input, updateDisplay, error] = operation(
    state.accumulator,
    parseFloat(state.input),
    state.operator
  )

  if (error === true) {
    return { initialState, display: 'ERROR' }
  } else if (updateDisplay === true) {
    return {
      accumulator: accumulator,
      input: '',
      operator: operator,
      display: parseAccumulator(accumulator)
    }
  } else {
    return { ...state, input: '', accumulator: input, operator: operator }
  }
}

export function useCalculator() {
  const [state, setState] = useState(initialState)

  const handleClick = e => {
    const id = e.currentTarget.id

    if (isDigitButton(id)) {
      const newState = handleDigit(state, getDigitValueFromId(id))
      setState({ ...newState })
    } else if (isOperatorButton(id)) {
      const newState = handleOperator({ ...state }, id)
      setState(newState)
    }
  }

  return {
    handleClick,
    display: state.display,
    operator: state.operator
  }
}
