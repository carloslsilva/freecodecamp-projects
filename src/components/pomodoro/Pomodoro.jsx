import { store } from '@/lib/pomodoroStore'
import { Provider } from 'react-redux'
import { Container } from './Container'

export const Pomodoro = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}
