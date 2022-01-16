export function parseNegativeNumbersAndStringsToFloat (arr: any[]): number[] {
  return arr.map(str => {
    if (typeof str === 'string' && str.includes('++')) {
      return parseFloat(str.replace('++', '')) * -1
    } else {
      return parseFloat(str)
    }
  })
}

export function parseCommandForNegativeNumbers (command: string): string {
  return command.replace(/-/g, '++')
}
