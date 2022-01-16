import { Container } from 'typedi'
import StoreService from '@/services/StoreService'
import NotificationService from '@/services/NotificationService'

export default function list (): void {
  const store: any = Container.get(StoreService).get()

  if (!Object.keys(store).length) {
    Container.get(NotificationService).error('No shapes added yet.')
    return
  }
  for (const uuid in store) {
    Container.get(NotificationService).highlight(`Shape ${uuid}: ${store[uuid]}`)
  }
}
