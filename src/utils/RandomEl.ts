const getNRandomEl = function rand(arr: Array<any>, n: number) {
  const shuffled = arr.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

export { getNRandomEl }
