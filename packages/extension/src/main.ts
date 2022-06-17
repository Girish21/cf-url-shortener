import copySvg from 'internal-assets/copy.svg?url'
import externalLinkSvg from 'internal-assets/external-link.svg?url'
import githubSvg from 'internal-assets/github.svg?url'
import { copyMachine } from 'machines'
import { interpret } from 'xstate'
import './style.css'

let form = document.getElementById('url-form') as HTMLFormElement | null
let result = document.getElementById('result') as HTMLDivElement | null
let urlFieldset = document.getElementById(
  'url-fieldset',
) as HTMLFieldSetElement | null

function formSubmitHandler() {
  if (!form) {
    return
  }
  form.addEventListener('submit', e => {
    e.preventDefault()
    if (!form || !urlFieldset) {
      return
    }
    let urlElement = form.elements.namedItem('url') as HTMLInputElement | null
    let url = urlElement?.value

    if (!url || !url.length) {
      return
    }

    urlFieldset.disabled = true

    fetch('https://url.vgirish.net/generate', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data => {
        if (!result || !urlFieldset) {
          return
        }
        urlFieldset.disabled = false

        result.innerHTML = `<div class="mt-4 p-2 border-2 border-gray-900 shadow-[4px_4px] shadow-gray-900 bg-green-400 rounded">
          <div class="flex items-center gap-3">
            <a
              class="break-all text-base font-bold text-blue-700 underline hover:no-underline focus:outline-none focus-visible:no-underline"
              href="${data.shortUrl}"
              target="_blank"
            >
              ${data.shortUrl}
            </a>
            <button
              id="copy-button"
              data-copy-url="${data.shortUrl}"
              class="rounded text-lg hover:bg-white hover:bg-opacity-25 ease-out p-1 transition duration-150 hover:backdrop-blur-sm focus:outline-none focus-visible:backdrop-blur-sm focus-visible:bg-white focus-visible:bg-opacity-25"
            >
              <svg class="h-6 w-6">
                <use id="copy-icon" href="${copySvg}#clipboardIcon"></use>
              </svg>
            </button>
          </div>
        </div>`

        if (urlElement) {
          urlElement.value = ''
        }

        let copyButton = document.getElementById(
          'copy-button',
        ) as HTMLButtonElement | null

        if (copyButton) {
          copyButton.focus()
        }
      })
      .catch(_ => {
        if (!result || !urlFieldset) {
          return
        }
        urlFieldset.disabled = false
        result.innerHTML = `<div class="mt-4 p-2 border-2 border-gray-900 shadow-[4px_4px] shadow-gray-900 bg-red-300">
          <p class="text-gray-900 text-lg">
            Sorry could not generate a URL :(
          </p>
        </div>`
      })
  })
}

function preloadCopySvg() {
  let preload = document.createElement('link')
  preload.href = copySvg
  preload.rel = 'preload'
  preload.as = 'image'
  preload.type = 'image/svg+xml'
  document.head.append(preload)
}

function setGitHubIcon() {
  let githubIcon = document.getElementById(
    'github-icon',
  ) as SVGUseElement | null

  if (!githubIcon) {
    return
  }

  githubIcon.setAttribute('href', `${githubSvg}#github-icon`)
}

function setExternalLinkSvgIcon() {
  let externalIcon = document.getElementById(
    'external-icon',
  ) as SVGUseElement | null

  if (!externalIcon) {
    return
  }

  externalIcon.setAttribute('href', `${externalLinkSvg}#external`)
}

function focusInput() {
  let input = document.getElementById('url')
  input?.focus()
}

function globalButtonClickHandler() {
  function getButton(el: HTMLElement) {
    return el.closest('button') as HTMLButtonElement | null
  }

  window.addEventListener('click', e => {
    let buttonRef = getButton(e.target as HTMLElement)
    if (
      buttonRef &&
      buttonRef.id === 'copy-button' &&
      typeof buttonRef.dataset.copyUrl === 'string'
    ) {
      let useRef = buttonRef.querySelector('#copy-icon') as SVGUseElement | null
      let service = interpret(
        copyMachine.withContext({ url: buttonRef.dataset.copyUrl }),
      ).onTransition(state => {
        if (!useRef) {
          return
        }
        if (state.matches('copying')) {
          useRef.setAttribute('href', `${copySvg}#clipboardSelectedIcon`)
        } else if (state.matches('idle')) {
          useRef.setAttribute('href', `${copySvg}#clipboardIcon`)
        }
      })

      service.start()
      service.send('CLICK')
    }
  })
}

preloadCopySvg()
setGitHubIcon()
setExternalLinkSvgIcon()
focusInput()
formSubmitHandler()
globalButtonClickHandler()
