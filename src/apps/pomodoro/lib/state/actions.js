import { type } from './types'

export const action = {
  sessionLengthIncrement() {
    return {
      type: type.sessionLengthIncrement
    }
  },
  sessionLengthDecrement() {
    return {
      type: type.sessionLengthDecrement
    }
  },
  breakLengthIncrement() {
    return {
      type: type.breakLengthIncrement
    }
  },
  breakLengthDecrement() {
    return {
      type: type.breakLengthDecrement
    }
  },
  reset() {
    return {
      type: type.reset
    }
  },
  toggleRun() {
    return {
      type: type.toggleRun
    }
  },
  tick() {
    return {
      type: type.tick
    }
  }
}
