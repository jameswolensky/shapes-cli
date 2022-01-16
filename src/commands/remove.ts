import { Container } from 'typedi'
import StoreService from '@/services/StoreService'
import NotificationService from '@/services/NotificationService'

export default function remove (uuids: string[]): void {
  const store = Container.get(StoreService).get()
  for (let i = 0; i < uuids.length; i++) {
    const indexToDelete = store[uuids[i]] ?? null
    if (indexToDelete !== null) {
      try {
        delete store[uuids[i]]
        Container.get(StoreService).update(store)
        Container.get(NotificationService).success('Shape has been deleted successfully')
      } catch (e) {
        Container.get(NotificationService).error(`There was an error deleting shape ${uuids[i]}. Please try again.`)
      }
    } else {
      Container.get(NotificationService).error(`Shape ${uuids[i]} does not exist`)
    }
  }
}
