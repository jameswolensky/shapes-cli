import { Container, Service } from 'typedi'
import fs from 'fs'
import NotificationService from '@/services/NotificationService'
import __SERVICES from '@/global/services'
import { parseNegativeNumbersAndStringsToFloat } from '@/global/helpers'

export default function file (filePath: string): void {
  fs.readFile(filePath, 'utf8', (err, data) => {
    try {
	    if (err) throw err
      const shapeArray = data.split('\n')
      for (let i = 0; i < shapeArray.length; i++) {
        const shapeToAdd = shapeArray[i].split(' ')
        const serviceToUse: string = shapeToAdd[0]
        const service = __SERVICES[serviceToUse] as typeof Service
        const args: number[] = parseNegativeNumbersAndStringsToFloat(shapeToAdd.slice(1))
        Container.get(service).add(args)
      }
    } catch (e) {
      Container.get(NotificationService).error('There was a problem reading your file. Please try again.')
    }
  })
}
