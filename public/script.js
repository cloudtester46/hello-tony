const output = document.querySelector('[data-tony-output]')
const footer = document.querySelector('[data-footer]')

function buildLines() {
  const line = 'tony tony tony tony tony'
  const lineHeight = 28
  const printableHeight = Math.max(window.innerHeight * 0.66, 220)
  const lines = Math.ceil(printableHeight / lineHeight) + 4

  return Array.from({ length: lines }, () => line).join('\n')
}

function typeText(text) {
  let index = 0

  function printNextChunk() {
    if (!output) return

    output.textContent = text.slice(0, index)
    index += 12

    if (index <= text.length + 12) {
      window.requestAnimationFrame(printNextChunk)
      return
    }

    if (footer) {
      footer.hidden = false
    }
  }

  printNextChunk()
}

window.addEventListener('load', () => {
  typeText(buildLines())
})
