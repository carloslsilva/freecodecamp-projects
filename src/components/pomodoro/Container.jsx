import { action } from '@/lib/pomodoroStore'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Alarm } from './Alarm'
import { Display } from './Display'
import { LengthControl } from './LengthControl'
import { RunControl } from './RunControl'

export const Container = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => dispatch(action.tick()), 1000)
    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <div
      className={clsx(
        'grid grid-cols-4 grid-rows-6 gap-2',
        ' h-[350px] w-[350px]  rounded border-2 border-alpha px-4 py-6'
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
