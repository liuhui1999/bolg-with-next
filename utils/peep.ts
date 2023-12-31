import gsap from 'gsap'

class Peep {
  image: HTMLImageElement
  x: number
  y: number
  anchorY: number
  scaleX: number
  width!: number
  height!: number
  rect!: number[]
  drawArgs!: any[]
  walk: any

  constructor({ image, rect }: { image: HTMLImageElement, rect: number[] }) {
    this.image = image
    this.setRect(rect)

    this.x = 0
    this.y = 0
    this.anchorY = 0
    this.scaleX = 1
    this.walk = null
  }

  setRect(rect: number[]) {
    this.rect = rect
    this.width = rect[2]
    this.height = rect[3]

    this.drawArgs = [this.image, ...rect, 0, 0, this.width, this.height]
  }

  render(ctx:any) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.scaleX, 1)
    ctx.drawImage(...this.drawArgs)
    ctx.restore()
  }
}

export const randomRange = (min:any, max:any) => min + Math.random() * (max - min)

export const randomIndex = (array:any) => randomRange(0, array.length) | 0

export const removeFromArray = (array:any, i:any) => array.splice(i, 1)[0]

export const removeItemFromArray = (array:any, item:any) =>
  removeFromArray(array, array.indexOf(item))

export const removeRandomFromArray = (array:any) =>
  removeFromArray(array, randomIndex(array))

export const getRandomFromArray = (array:any) => array[randomIndex(array) | 0]

export const resetPeep = ({ stage, peep }:{stage:any,peep:any}) => {
  const direction = Math.random() > 0.5 ? 1 : -1
  // using an ease function to skew random to lower values to help hide that peeps have no legs
  const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random())
  const startY = stage.height - peep.height + offsetY
  let startX
  let endX

  if (direction === 1) {
    startX = -peep.width
    endX = stage.width
    peep.scaleX = 1
  } else {
    startX = stage.width + peep.width
    endX = 0
    peep.scaleX = -1
  }

  peep.x = startX
  peep.y = startY
  peep.anchorY = startY

  return {
    startX,
    startY,
    endX
  }
}

export const normalWalk = ({ peep, props }:{peep:any,props:any}) => {
  const { startX, startY, endX } = props

  const xDuration = 10
  const yDuration = 0.25

  const tl = gsap.timeline()
  tl.timeScale(randomRange(0.5, 1.5))
  tl.to(
    peep,
    {
      duration: xDuration,
      x: endX,
      ease: 'none'
    },
    0
  )
  tl.to(
    peep,
    {
      duration: yDuration,
      repeat: xDuration / yDuration,
      yoyo: true,
      y: startY - 10
    },
    0
  )

  return tl
}

export default Peep