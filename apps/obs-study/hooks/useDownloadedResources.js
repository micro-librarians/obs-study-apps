import { useEffect, useState } from 'react'

function useDownloadedResources() {
  const [downloadedResources, setDownloadedResources] = useState()
  useEffect(() => {
    const getCachedResources = async () => {
      const cashedResources = await caches.open('obs-zip')
      cashedResources.keys().then((res) => {
        const downloadedResources = res.map((el) => {
          const first = 'https://git.door43.org/'.length
          const last = '/archive/master.zip'.length
          const [owner, repo] = el.url.slice(first, -last).split('/')
          return { owner, repo, url: el.url }
        })
        setDownloadedResources(downloadedResources)
      })
    }
    getCachedResources()
  }, [])
  return { state: downloadedResources }
}

export default useDownloadedResources
