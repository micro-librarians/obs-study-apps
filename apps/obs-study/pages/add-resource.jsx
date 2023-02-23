import { LanguageSelect } from 'language-select'
import styled from '@emotion/styled'
import useDownloadedResources from '../hooks/useDownloadedResources'
import { useState } from 'react'
import { ResourcesList } from 'language-select'

const StyledPage = styled.div`
  .page {
  }
`

export function AddResourcePage() {
  const { state: downloadedResources } = useDownloadedResources()
  const [listOfResources, setListOfResources] = useState([])
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div>
            <LanguageSelect onLanguageSelect={setListOfResources} />
            <div>Select a resource:</div>
            <ResourcesList
              downloadedResources={downloadedResources ?? []}
              listOfResources={listOfResources}
            />
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default AddResourcePage
