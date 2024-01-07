export const ticksToMinutesSeconds = ticks => {
  const strPadLeft = (string, pad, length) =>
    (new Array(length + 1).join(pad) + string).slice(-length)
  const minutes = ~~(ticks / 60)
  const seconds = ticks - minutes * 60
  return `${strPadLeft(minutes, '0', 2)}:${strPadLeft(seconds, '0', 2)}`
}

export const minutesToTicks = minutes => minutes * 60

export const cloneObject = obj => JSON.parse(JSON.stringify(obj))
