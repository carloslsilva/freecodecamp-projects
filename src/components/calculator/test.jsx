const BUTTON = [
  {
    text: '0',
    id: 'zero',
    className: 'button button-digit'
  },
  {
    text: '1',
    id: 'one',
    className: 'button button-digit'
  },
  {
    text: '2',
    id: 'two',
    className: 'button button-digit'
  },
  {
    text: '3',
    id: 'three',
    className: 'button button-digit'
  },
  {
    text: '4',
    id: 'four',
    className: 'button button-digit'
  },
  {
    text: '5',
    id: 'five',
    className: 'button button-digit'
  },
  {
    text: '6',
    id: 'six',
    className: 'button button-digit'
  },
  {
    text: '7',
    id: 'seven',
    className: 'button button-digit'
  },
  {
    text: '8',
    id: 'eight',
    className: 'button button-digit'
  },
  {
    text: '9',
    id: 'nine',
    className: 'button button-digit'
  },
  {
    text: '.',
    id: 'decimal',
    className: 'button button-digit'
  },
  {
    text: '+',
    id: 'add',
    className: 'button button-operator'
  },
  {
    text: '-',
    id: 'subtract',
    className: 'button button-operator'
  },
  {
    text: 'x',
    id: 'multiply',
    className: 'button button-operator'
  },
  {
    text: '÷',
    id: 'divide',
    className: 'button button-operator'
  },
  {
    text: '=',
    id: 'equals',
    className: 'button button-operator'
  },
  {
    text: 'C',
    id: 'clear',
    className: 'button button-cancel'
  }
]

const MAX_DIGITS = 16
const MAX_INTEGER_ON_DISPLAY = 999999999999999
const MIN_FLOAT_ON_DISPLAY = 0.0000000000001
const DIGITS_AFTER_DECIMAL = 14
const FRACTION_DIGITS = 10

const Display = props => {
  return (
    <div>
      <h1 className='display-status'>
        {props.operator !== undefined ? props.operator : ' '}
      </h1>
      <p className='display' id='display'>
        {props.text}
      </p>
    </div>
  )
}

const ButtonPad = props => {
  return (
    <div className='button-pad'>
      {BUTTON.map(e => (
        <button
          type='button'
          onClick={props.onClick}
          className={e.className}
          id={e.id}
        >
          {e.text}
        </button>
      ))}
    </div>
  )
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      accumulator: 0,
      operator: undefined,
      displayText: '0'
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(event) {
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
        const digitId = BUTTON.filter(e => e.text === key)
          .map(e => e.id)
          .toString()
        document.getElementById(digitId).click()
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

  handleClick(event) {
    event.preventDefault()
    switch (event.target.id) {
      case 'zero':
      case 'one':
      case 'two':
      case 'three':
      case 'four':
      case 'five':
      case 'six':
      case 'seven':
      case 'eight':
      case 'nine':
      case 'decimal':
        const digit = BUTTON.filter(e => e.id === event.target.id)
          .map(e => e.text)
          .toString()
        this.handleDigit(digit)
        break
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
      case 'equals':
      case 'clear':
        this.handleOperator(event.target.id)
        break
      default:
        console.log('error, this case is not handled', event.target)
        break
    }
  }

  handleDigit(digit) {
    const update = digit => {
      let input = this.state.input

      if (input.length >= MAX_DIGITS - 1 && digit === '.') {
        return
      }

      if (input.length >= MAX_DIGITS) {
        return
      }

      if (input === '0') {
        if (digit !== '0') {
          input = digit
        }
      } else {
        input = input.concat(digit)
      }

      this.setState({
        input: input,
        displayText: input
      })
    }

    if (digit === '.') {
      let input = this.state.input
      if (input.length === 0) {
        update('0.')
      } else if (input.indexOf('.') < 0) {
        update('.')
      } else {
      }
    } else {
      update(digit)
    }
  }

  handleOperator(operator) {
    const operation = (accumulator, input, operator) => {
      let update = false
      let error = false
      switch (operator) {
        case 'add': {
          accumulator += input
          update = true
          break
        }
        case 'subtract': {
          accumulator -= input
          update = true
          break
        }
        case 'multiply': {
          accumulator *= input
          update = true
          break
        }
        case 'divide': {
          if (input !== 0) {
            accumulator /= input
            update = true
          } else {
            error = true
          }
          break
        }
        default: {
          update = false
          break
        }
      }

      return [accumulator, input, update, error]
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
      this.setState({
        input: '',
        accumulator: 0,
        operator: undefined,
        displayText: '0'
      })
      return
    }

    if (this.state.input === '') {
      this.setState({
        operator: operator
      })
      return
    }

    let [accumulator, input, updateDisplay, error] = operation(
      this.state.accumulator,
      parseFloat(this.state.input),
      this.state.operator
    )

    if (error === true) {
      this.setState({
        input: '',
        accumulator: 0,
        operator: undefined,
        displayText: 'ERROR'
      })
    } else if (updateDisplay === true) {
      this.setState({
        input: '',
        accumulator: accumulator,
        operator: operator,
        displayText: parseAccumulator(accumulator)
      })
    } else {
      this.setState({
        input: '',
        accumulator: input,
        operator: operator
      })
    }
  }

  render() {
    return (
      <div className='calculator'>
        <Display text={this.state.displayText} operator={this.state.operator} />
        <ButtonPad onClick={this.handleClick} />
      </div>
    )
  }
}
