import Link from 'next/link'

import styled from '@emotion/styled'
import { Button } from '@mui/material'

import useDownloadedResources from '../hooks/useDownloadedResources'

const StyledPage = styled.div`
  .page {
  }
`
export function Index() {
  const { state: downloadedResources } = useDownloadedResources()
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
                  <Link href={`/study/${el.owner}/${el.repo}/01:01`}>
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
