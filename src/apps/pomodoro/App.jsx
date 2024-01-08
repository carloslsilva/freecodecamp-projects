import clsx from 'clsx'
import { Provider } from 'react-redux'
import { Alarm } from './components/Alarm'
import { Display } from './components/Display'
import { LengthControl } from './components/LengthControl'
import { RunControl } from './components/RunControl'
import { usePomodoro } from './hooks/usePomodoro'
import { store } from './lib/state/store'

const Container = () => {
  usePomodoro()
  return (
    <div
      className={clsx(
        'grid grid-cols-4 grid-rows-6 gap-2',
        'h-[350px] w-[350px] rounded border-2 border-alpha px-4 py-6'
      )}
    >
      <Display />
      <LengthControl session />
      <LengthControl />
      <RunControl />
      <Alarm />
    </div>
  )
}

export const App = () => (
  <Provider store={store}>
    <Container />
  </Provider>
)
