
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import Peep, {
  getRandomFromArray,
  normalWalk,
  removeItemFromArray,
  removeRandomFromArray,
  resetPeep
} from '@/utils/peep'



let img: HTMLImageElement;
let canvas: any;
let ctx: any;
const People: React.FC = () => {
  // ref
  const canvasRef = useRef<any>(null)
  const config = {
    src: '/open-peeps-sheet.png',
    rows: 15,
    cols: 7
  }
  const stage = {
    width: 0,
    height: 0
  }
  const allPeeps: any = []
  const availablePeeps: any[] = []
  const crowd: any = []
  const walks = [normalWalk]

  const init = () => {
    createPeeps()

    // resize also (re)populates the stage
    resize()

    gsap.ticker.add(render)
    window.addEventListener('resize', resize)
  }
  const createPeeps = () => {
    const { rows, cols } = config
    const { naturalWidth: width, naturalHeight: height } = img
    const total = rows * cols
    const rectWidth = width / rows
    const rectHeight = height / cols

    for (let i = 0; i < total; i++) {
      allPeeps.push(
        new Peep({
          image: img,
          rect: [
            (i % rows) * rectWidth,
            ((i / rows) | 0) * rectHeight,
            rectWidth,
            rectHeight
          ]
        })
      )
    }
  }
  const removePeepFromCrowd = (peep: any) => {
    removeItemFromArray(crowd, peep)
    availablePeeps.push(peep)
  }
  const addPeepToCrowd = () => {
    const peep = removeRandomFromArray(availablePeeps)
    const walk = getRandomFromArray(walks)({
      peep,
      props: resetPeep({
        peep,
        stage
      })
    }).eventCallback('onComplete', () => {
      removePeepFromCrowd(peep)
      addPeepToCrowd()
    })

    peep.walk = walk

    crowd.push(peep)
    crowd.sort((a: any, b: any) => a.anchorY - b.anchorY)

    return peep
  }
  const render = () => {
    // eslint-disable-next-line no-self-assign
    canvas.width = canvas.width
    ctx?.save()
    ctx?.scale(devicePixelRatio, devicePixelRatio)

    crowd.forEach((peep: any) => {
      peep.render(ctx)
    })

    ctx?.restore()
  }
  const initCrowd = () => {
    while (availablePeeps.length) {
      // setting random tween progress spreads the peeps out
      addPeepToCrowd().walk.progress(Math.random())
    }
  }
  const resize = () => {
    stage.width = canvas.clientWidth
    stage.height = canvas.clientHeight
    canvas.width = stage.width * devicePixelRatio
    canvas.height = stage.height * devicePixelRatio

    crowd.forEach((peep: any) => {
      peep.walk.kill()
    })

    crowd.length = 0
    availablePeeps.length = 0
    availablePeeps.push(...allPeeps)

    initCrowd()
  }
  useEffect(() => {
    img = document.createElement('img')
    img.onload = init
    img.src = config.src
    canvas = canvasRef.current
    ctx = canvas.getContext('2d')
  }, [])
  return (
    <div className='w-full absolute'>
      <canvas ref={canvasRef} id="people" className=" w-full z-10"></canvas>
    </div>
  );
};
export default People;
