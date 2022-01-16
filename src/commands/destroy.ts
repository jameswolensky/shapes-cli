import { Container } from 'typedi'
import StoreService from '@/services/StoreService'
import NotificationService from '@/services/NotificationService'

export default function destroy (): void {
  try {
    Container.get(StoreService).update({})
    Container.get(NotificationService).success('All shapes successfully destroyed.')
  } catch (e) {
    Container.get(NotificationService).error('There was a problem destroying your shapes. Please try again.')
  }
}
