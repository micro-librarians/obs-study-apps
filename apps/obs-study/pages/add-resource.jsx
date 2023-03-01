import { useMemo, useState } from 'react'
import { LanguageSelect, ResourcesList } from 'language-select'
import useDownloadedResources from '../hooks/useDownloadedResources'
import styled from '@emotion/styled'
import { useObsResources } from 'obs-frame'
import { getLanguagesFromResources } from '../helpers/resources'

const StyledPage = styled.div`
  .page {
  }
`

export function AddResourcePage() {
  const { state: downloadedResources } = useDownloadedResources()
  const [listOfResources, setListOfResources] = useState([])
  const [resources] = useObsResources()

  const languages = useMemo(
    () => getLanguagesFromResources(resources),
    [resources]
  )

  const setNewListOfResources = ([newLanguage]) => {
    const languageResources = resources.filter(
      (res) => res.language_title === newLanguage.title
    )
    setListOfResources(languageResources)
  }

  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div>
            <LanguageSelect
              languages={languages}
              onLanguageSelect={setNewListOfResources}
            />
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
