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

        result.innerHTML = `<div class="mt-4 p-2 border-2 border-gray-900 shadow-[4px_4px] shadow-gray-900 bg-green-500">
          <div class="flex items-center gap-3">
            <a
              class="break-all text-base font-bold text-blue-700 underline hover:no-underline"
              href="${data.shortUrl}"
              target="_blank"
            >
              ${data.shortUrl}
            </a>
            <button
              id="copy-button"
              data-copy-url="${data.shortUrl}"
              class="rounded text-white text-lg hover:bg-white hover:bg-opacity-25 ease-out p-1 transition duration-150 hover:backdrop-blur-sm"
            >
              Copy
            </button>
          </div>
        </div>`
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

formSubmitHandler()

window.addEventListener('click', e => {
  if (
    e.target &&
    e.target instanceof HTMLButtonElement &&
    e.target.id === 'copy-button' &&
    typeof e.target.dataset.copyUrl === 'string'
  ) {
    window.navigator.clipboard.writeText(e.target.dataset.copyUrl)
  }
})
