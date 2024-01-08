import { useAlarm } from '../hooks/useAlarm'

export const Alarm = () => {
  const audioId = useAlarm()
  return <audio src='alarm.mp3' type='audio/mp3' id={audioId} />
}
