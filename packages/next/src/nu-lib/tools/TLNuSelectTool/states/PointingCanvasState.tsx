import { Vec } from '@tldraw/vec'
import { TLNuApp, TLNuSelectTool, TLNuShape, TLNuToolState } from '~nu-lib'
import type { TLNuBinding, TLNuPinchHandler, TLNuPointerHandler, TLNuWheelHandler } from '~types'

export class PointingCanvasState<
  R extends TLNuApp,
  P extends TLNuSelectTool<R>
> extends TLNuToolState<R, P> {
  static id = 'pointingCanvas'

  onEnter = () => {
    const { shiftKey } = this.app.inputs
    if (!shiftKey) this.app.deselectAll()
  }

  onWheel: TLNuWheelHandler = (info, gesture, e) => {
    this.onPointerMove(info, e)
  }

  onPointerMove: TLNuPointerHandler = () => {
    const { currentPoint, originPoint } = this.app.inputs
    if (Vec.dist(currentPoint, originPoint) > 5) {
      this.tool.transition('brushing')
    }
  }

  onPointerUp: TLNuPointerHandler = () => {
    this.app.deselectAll()
    this.tool.transition('idle')
  }

  onPinchStart: TLNuPinchHandler = (info, gesture, event) => {
    this.tool.transition('pinching', { info, gesture, event })
  }
}
