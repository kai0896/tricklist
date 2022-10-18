export function msToTime(duration: number) {
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  const h = (hours < 10) ? "0" + hours : hours
  const m = (minutes < 10) ? "0" + minutes : minutes

  return h + ":" + m
}
