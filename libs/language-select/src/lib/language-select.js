import { useEffect, useState, useMemo, useCallback } from 'react'

import { Autocomplete, TextField } from '@mui/material'
import axios from 'axios'

export function LanguageSelect({ selectedLanguage }) {
  const [selectedResource, setSelectedResource] = useState('English')
  const [resources, setResources] = useState([])
  useEffect(() => {
    axios
      .get(
        'https://git.door43.org/api/v1/catalog/search?sort=released&subject=Open%20Bible%20Stories'
      )
      .then((res) => {
        setResources(() =>
          res.data.data.map((el) => ({
            id: el.id,
            language_title: el.language_title,
            language: el.language,
            name: el.name,
            owner: el.owner,
            branch_or_tag_name: el.branch_or_tag_name,
            title: el.title,
            zipball_url: el.zipball_url,
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
    return Array.from(new Set(resources.map((el) => el?.language_title)))
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
