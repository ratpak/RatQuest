const playerProgressFunc = (curStage, progressWithinStage) => {
  const progress = progressWithinStage + (curStage - 1) * 5
  return progress < 10 ? '0' + progress.toString() : progress.toString()
}

export default playerProgressFunc
