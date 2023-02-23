import axios from 'axios'

import { Button } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const uploadResource = (url) => {
  axios.get(url)
}

export function ResourcesList({ downloadedResources = [], listOfResources }) {
  const [downloadedResourcesList, setDownloadedResourcesList] = useState([])
  useEffect(() => {
    setDownloadedResourcesList(downloadedResources.map((el) => el.url))
  }, [downloadedResources])
  return (
    <div>
      {listOfResources.map((el) => (
        <div key={el.id}>
          {el.title} ({el.owner.full_name})
          {downloadedResourcesList.includes(el.zipball_url) ? (
            <div>Uploaded</div>
          ) : (
            <Button onClick={() => uploadResource(el.zipball_url)}>
              Upload
            </Button>
          )}
          <Link href={`/study/${el.owner.username}/${el.name}/01:01`}>
            <Button>Open</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ResourcesList
