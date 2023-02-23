import { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Button } from '@mui/material'


const StyledPage = styled.div`
  .page {
  }
`

export function Index() {
  const [downloadedResources, setDownloadedResources] = useState()
  useEffect(() => {
    const getCachedResources = async () => {
      const cashedResources = await caches.open('obs-zip')
      cashedResources.keys().then((res) => {
        const downloadedResources = res.map((el) => {
          const first = 'https://git.door43.org/'.length
          const last = '/archive/master.zip'.length
          const [owner, repo] = el.url.slice(first, -last).split('/')
          return { owner, repo }
        })
        setDownloadedResources(downloadedResources)
      })
    }
    getCachedResources()
  }, [])
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            Downloaded resources List
            <br />
            <br />
            {downloadedResources &&
              downloadedResources?.map((el, index) => (
                <div key={index}>
                  <Link href={`/study/${el.owner}/${el.repo}/1:1`}>
                    {`${el.repo}(${el.owner})`}
                  </Link>
                  <br />
                </div>
              ))}
            <br />
            <br />
            <Link href={'/add-resource'}>
              <Button variant="contained">Add resource</Button>
            </Link>
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default Index
