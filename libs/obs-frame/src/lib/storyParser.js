import axios from 'axios'

export const storyParser = (md) => {
  let _markdown = md.replaceAll('\u200B', '').split(/\n\s*\n\s*/)
  const title = _markdown.shift().trim().slice(1)
  let link = _markdown.pop().trim().slice(1, -1)
  if (link === '') {
    link = _markdown.pop().trim().slice(1, -1)
  }
  const frames = {}

  let images = new Map()
  for (let n = 0; n < _markdown.length / 2; n++) {
    let urlImage
    let text
    if (/\(([^)]*)\)/g.test(_markdown[n * 2])) {
      urlImage = /\(([^)]*)\)/g.exec(_markdown[n * 2])[1]
      if (!images.get(urlImage))
        images.set(
          urlImage,
          axios
            .get(urlImage, {
              responseType: 'blob',
            })
            .then((response) => URL.createObjectURL(response.data))
            .catch((err) => {
              console.warn(err)
              return urlImage
            })
        )
      text = _markdown[n * 2 + 1]
    } else {
      text = _markdown[n * 2] + '\n' + _markdown[n * 2 + 1]
    }
    frames[(n + 1).toString().padStart(2, 0)] = text
  }
  return { frames, title, link, images }
}
