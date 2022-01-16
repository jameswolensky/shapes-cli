import { Container, Service } from 'typedi'
import NotificationService from '@/services/NotificationService'
import __SERVICES from '@/global/services'
import ICoordinates from '@/interfaces/coordinates.interface'
import StoreService from '@/services/StoreService'

export default function point (args: any): void {
  if (args.length > 2 || args.length < 2) {
    Container.get(NotificationService).error(`Overlap requires exactly 2 arguments. ${args.length} provided`)
    return
  }
  let totalAreaOfAllShapesInOverlap = 0
  const store: any = Container.get(StoreService).get()
  const point: ICoordinates = {
    x: parseFloat(args[0]),
    y: parseFloat(args[1])
  }
  for (const uuid in store) {
    const serviceToUse: string = store[uuid][0]
    const service = __SERVICES[serviceToUse] as typeof Service
    const args: number[] = store[uuid].slice(1)
    const result: [boolean, number] = Container.get(service).isPointWithinShape(point, args)
    if (result[0]) {
      const area = result[1]
      totalAreaOfAllShapesInOverlap += area
      Container.get(NotificationService).success(`(${point.x}, ${point.y}) are within ${serviceToUse} ${uuid} | Area: ${area}`)
    }
  }
  Container.get(NotificationService).success(`Total area of all overlapped shapes ${totalAreaOfAllShapesInOverlap}`)
}
