const pad2 = (value: number) => String(value).padStart(2, '0')

/** `createdAtNum` 등 Date.valueOf() → `[26.10.19] 18:18:40` */
export const convertDateNum = (dateNum: number) => {
  const date = new Date(dateNum)

  const yy = String(date.getFullYear()).slice(-2)
  const mm = pad2(date.getMonth() + 1)
  const dd = pad2(date.getDate())
  // const hh = pad2(date.getHours())
  // const mi = pad2(date.getMinutes())
  // const ss = pad2(date.getSeconds())

  // return `[${yy}.${mm}.${dd}] ${hh}:${mi}:${ss}`
  return `${yy}.${mm}.${dd}`
}
