export class MaxDistanceError extends Error {
  constructor() {
    super('You are too far from the gym to check in.')
  }
}
