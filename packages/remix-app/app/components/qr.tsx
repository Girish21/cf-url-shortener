import { useActionData } from '@remix-run/react'
import { toCanvas } from 'qrcode'
import * as React from 'react'
import type { ActionData } from '~/generateUrl'

function QRCode() {
  let actionData = useActionData<ActionData>()
  let canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (
      !canvasRef.current ||
      !actionData ||
      (actionData && ('error' in actionData || !('shortUrl' in actionData)))
    ) {
      return
    }
    toCanvas(canvasRef.current, actionData.shortUrl, { margin: 1 })
  }, [actionData])

  if (!actionData || (actionData && 'error' in actionData)) {
    return null
  }

  return (
    <div className='mx-auto w-max overflow-hidden rounded border-2 border-gray-900 shadow-[4px_4px] dark:border-none dark:shadow-none'>
      <canvas aria-hidden ref={canvasRef} />
    </div>
  )
}

export default QRCode
