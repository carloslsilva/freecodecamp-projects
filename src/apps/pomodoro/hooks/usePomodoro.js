import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { action } from '../lib/state/actions'

export function usePomodoro() {
  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => dispatch(action.tick()), 1000)
    return () => clearInterval(interval)
  }, [dispatch])
}
