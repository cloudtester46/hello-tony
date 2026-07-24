const output = document.querySelector('[data-tony-output]')
const footer = document.querySelector('[data-footer]')

function measureCharacterWidth(element) {
  const sample = document.createElement('span')
  sample.textContent = 'tony tony tony tony tony'
  sample.style.position = 'absolute'
  sample.style.visibility = 'hidden'
  sample.style.whiteSpace = 'pre'
  sample.style.font = window.getComputedStyle(element).font
  document.body.append(sample)

  const width = sample.getBoundingClientRect().width / sample.textContent.length
  sample.remove()

  return width
}

function buildLines() {
  if (!output) return ''

  const styles = window.getComputedStyle(output)
  const lineHeight = Number.parseFloat(styles.lineHeight)
  const characterWidth = measureCharacterWidth(output)
  const lineCount = Math.max(1, Math.floor(output.clientHeight / lineHeight))
  const characterCount = Math.max(5, Math.floor(output.clientWidth / characterWidth))
  const repeatedTony = 'tony '.repeat(Math.ceil(characterCount / 5)).trimEnd()
  const line = repeatedTony.slice(0, characterCount).trimEnd()

  return Array.from({ length: lineCount }, () => line).join('\n')
}

function typeText(text) {
  let index = 0

  function printNextChunk() {
    if (!output) return

    output.textContent = text.slice(0, index)
    index += 36

    if (index <= text.length + 36) {
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
