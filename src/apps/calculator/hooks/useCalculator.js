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

function parseAccumulator(accumulator) {
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

function handleOperation(state, operator) {
  let accumulator = state.accumulator
  let input = parseFloat(state.input)
  let currentOperator = state.operator
  let update = false
  let error = false

  switch (currentOperator) {
    case 'add':
      accumulator += input
      update = true
      break
    case 'subtract':
      accumulator -= input
      update = true
      break
    case 'multiply':
      accumulator *= input
      update = true
      break
    case 'divide':
      if (input !== 0) {
        accumulator /= input
        update = true
      } else {
        error = true
      }
      break
    default:
      update = false
      break
  }

  if (error) {
    return { ...initialState, display: 'ERROR' }
  } else if (update) {
    return {
      accumulator,
      input: '',
      operator,
      display: parseAccumulator(accumulator)
    }
  } else {
    return { ...state, input: '', accumulator: input, operator }
  }
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
  if (operator === 'clear') {
    return { ...initialState }
  }

  if (state.input === '') {
    return { ...state, operator }
  }

  return handleOperation(state, operator)
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
