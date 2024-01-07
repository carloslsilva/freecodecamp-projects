import { store } from '@/lib/pomodoroStore'
import { Provider } from 'react-redux'
import { Container } from './Container'
import './style.css'

export const Pomodoro = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}
