const getRandomEl = function rand(arr: Array<string>) {
  const min = 0
  const max = arr.length
  return arr[Math.floor(Math.random() * (max - min) + min)]
}

export { getRandomEl }
