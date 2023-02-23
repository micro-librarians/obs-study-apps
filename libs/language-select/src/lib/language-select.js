import { useEffect, useState, useMemo, useCallback } from 'react'
import axios from 'axios'

import { Autocomplete, TextField } from '@mui/material'

export function LanguageSelect({ selectedLanguage }) {
  const [selectedResource, setSelectedResource] = useState('Select your language')
  const [resources, setResources] = useState([])
  useEffect(() => {
    axios
      .get(
        'https://git.door43.org/api/v1/repos/search?sort=updated&order=desc&subject=Open%20Bible%20Stories'
      )
      .then((res) => {
        setResources(() =>
          res.data.data.map((el) => ({
            id: el.id,
            language_title: el.language_title,
            language: el.language,
            name: el.name,
            owner: el.owner.username,
            default_branch: el.default_branch,
            title: el.title,
            zipball_url: `${el.html_url}/archive/master.zip`,
          }))
        )
      })
  }, [])

  const setNewSelectedResource = useCallback(
    (e, newSelectedResource) => {
      setSelectedResource(newSelectedResource)
      selectedLanguage(
        resources.filter((el) => el.language_title === newSelectedResource)[0]
      )
    },
    [selectedLanguage, resources]
  )

  const langs = useMemo(() => {
    return Array.from(new Set(resources.map((el) => el?.language_title))).sort()
  }, [resources])

  return (
    <Autocomplete
      disablePortal
      id="select-language"
      options={langs}
      value={selectedResource}
      onChange={setNewSelectedResource}
      renderInput={(params) => (
        <TextField {...params} label="Select language" />
      )}
    />
  )
}
export default LanguageSelect
