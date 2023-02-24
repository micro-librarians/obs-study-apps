import jszip from 'jszip'
import JSZipUtils from 'jszip-utils'
import { storyParser } from './storyParser'
import axios from 'axios'

export const fetchObs = async ({ owner, repo, tag = 'master' }) => {
  const _url = `https://git.door43.org/${owner}/${repo}/archive/${tag}.zip`

  const stories = new Promise((resolve, reject) => {
    JSZipUtils?.getBinaryContent(_url, function (err, data) {
      if (err) {
        reject(err)
        throw err
      }
      var zip = new jszip()

      zip.loadAsync(data).then(async function () {
        const allStories = {}
        for (const key in zip.files) {
          if (Object.hasOwnProperty.call(zip.files, key)) {
            if (key.match(/\/content\/\d/gm)) {
              const md = await zip.files[key].async('string')
              const name = key.slice(-5, -3)
              const { title, frames, link, images } = storyParser(md)
              allStories[name] = { title, frames, link, images }
            }
          }
        }
        resolve(allStories)
      })
    })
  })
  return stories
}

export const fetchObsResources = ({
  sort = 'released',
  order = 'desc',
} = {}) => {
  console.log({ sort, order })
  const resources = new Promise((resolve, reject) => {
    axios
      .get(
        `https://git.door43.org/api/v1/catalog/search?sort=${sort}&order=${order}&subject=Open%20Bible%20Stories`
      )
      .then((res) => {
        resolve(() =>
          res.data.data.map(({ repo: el, release }) => ({
            id: el.id,
            language_title: el.language_title,
            language: el.language,
            language_direction: el.language_direction,
            language_is_gl: el.language_is_gl,
            name: el.name,
            owner: el.owner,
            default_branch: el.default_branch,
            title: el.title,
            tag: release.tag_name,
            zipball_url: `${el.html_url}/archive/master.zip`,
          }))
        )
      })
      .catch((err) => {
        reject(err)
      })
  })
  return resources
}
