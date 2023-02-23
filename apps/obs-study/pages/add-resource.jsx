import { useState } from 'react'

import { LanguageSelect, ResourcesList } from 'language-select'

import useDownloadedResources from '../hooks/useDownloadedResources'

import styled from '@emotion/styled'

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
