import { useEffect, useState, useMemo, useCallback } from 'react'

import axios from 'axios'

import { Autocomplete, TextField } from '@mui/material'

export function LanguageSelect({ onLanguageSelect }) {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(
        'https://git.door43.org/api/v1/catalog/search?sort=released&order=desc&subject=Open%20Bible%20Stories'
      )
      .then((res) => {
        setResources(() =>
          res.data.data.map(({ repo: el }) => ({
            id: el.id,
            language_title: el.language_title,
            language: el.language,
            name: el.name,
            owner: el.owner,
            default_branch: el.default_branch,
            title: el.title,
            zipball_url: `${el.html_url}/archive/master.zip`,
          }))
        )
      })
  }, [])

  const setNewSelectedLanguage = useCallback(
    (e, newSelectedLanguage) => {
      onLanguageSelect(
        resources.filter((el) => el.language_title === newSelectedLanguage)
      )
    },
    [onLanguageSelect, resources]
  )

  const uniqueLanguages = useMemo(() => {
    return Array.from(new Set(resources.map((el) => el?.language_title))).sort()
  }, [resources])

  return (
    <Autocomplete
        disablePortal
        options={uniqueLanguages}
        onChange={setNewSelectedLanguage}
        renderInput={(params) => (
          <TextField {...params} label="Select language" />
        )}
      />
  )
}
export default LanguageSelect
