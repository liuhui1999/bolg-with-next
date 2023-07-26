

console.warn('copy.js loaded')

const copySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
copySvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
copySvg.setAttribute('fill', 'none')
copySvg.setAttribute('viewBox', '0 0 24 24')
copySvg.setAttribute('stroke-width', '1.5')
copySvg.setAttribute('stroke', 'currentColor')
copySvg.setAttribute('class', 'w-6 h-6')

const copyPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
copyPath.setAttribute('stroke-linecap', 'round')
copyPath.setAttribute('stroke-linejoin', 'round')
copyPath.setAttribute('d',
    'M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75')

copySvg.appendChild(copyPath)

const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
checkSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
checkSvg.setAttribute('fill', 'none')
checkSvg.setAttribute('viewBox', '0 0 24 24')
checkSvg.setAttribute('stroke-width', '1.5')
checkSvg.setAttribute('stroke', 'currentColor')
checkSvg.setAttribute('class', 'w-6 h-6')

const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
checkPath.setAttribute('stroke-linecap', 'round')
checkPath.setAttribute('stroke-linejoin', 'round')
checkPath.setAttribute('d', 'M5 13l4 4L19 7')

checkSvg.appendChild(checkPath)

const copyButton = document.createElement('button')
copyButton.className = "copy"
copyButton.appendChild(copySvg)
const allPres = document.querySelectorAll('pre')
allPres.forEach((pre) => {
    console.warn(pre)
    const copy = copyButton.cloneNode(true)
    pre.appendChild(copy)
    copy.onclick = async () => {
        try {
            const status = await navigator.permissions.query(
                { name: 'clipboard-write' })
            if (status.state === 'denied') {
                return
            }
            copy.removeChild(copy.firstChild)
            await navigator.clipboard.writeText(pre.textContent)
            copy.appendChild(checkSvg)
            setTimeout(() => {
                copy.removeChild(copy.firstChild)
                copy.appendChild(copySvg)
            }, 1000)
        } catch (e) {
            console.error(e)
        }
    }
})
