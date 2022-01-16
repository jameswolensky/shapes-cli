import CircleService from '@/services/CircleService'
import ReactangleService from '@/services/RectangleService'
import SquareService from '@/services/SquareService'
import TriangleService from '@/services/TriangleService'
import DonutService from '@/services/DonutService'
import EllipseService from '@/services/EllipseService'

const __SERVICES: any = {
  circle: CircleService,
  ellipse: EllipseService,
  triangle: TriangleService,
  square: SquareService,
  rectangle: ReactangleService,
  donut: DonutService
}

export default __SERVICES
