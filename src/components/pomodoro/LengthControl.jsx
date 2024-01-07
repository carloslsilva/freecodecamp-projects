export const LengthControl = props => {
  const { label, display, button } = props.parameters
  return (
    <div className={props.containerClassName}>
      <div className='pomodoro-length-control-display pomodoro-background-color-yellow'>
        <div id={label.id}>{label.text}</div>
        <div id={display.id}>{props.length}</div>
      </div>
      <div className='pomodoro-button-group'>
        <button
          type='button'
          onClick={props.increment}
          className='pomodoro-button pomodoro-background-color-yellow'
          id={button.increment.id}
        >
          <i className='fas fa-chevron-up' />
        </button>
        <button
          type='button'
          onClick={props.decrement}
          className='pomodoro-button pomodoro-background-color-yellow'
          id={button.decrement.id}
        >
          <i className='fas fa-chevron-down' />
        </button>
      </div>
    </div>
  )
}
