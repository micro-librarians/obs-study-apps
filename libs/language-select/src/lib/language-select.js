import { useMemo, useCallback } from 'react'

import { Autocomplete, TextField } from '@mui/material'

export function LanguageSelect({ languages, onLanguageSelect }) {
  const setNewSelectedLanguage = useCallback(
    (e, newSelectedLanguage) => {
      onLanguageSelect(
        languages.filter((language) => language.title === newSelectedLanguage)
      )
    },
    [onLanguageSelect, languages]
  )

  const uniqueLanguages = useMemo(() => {
    return Array.from(
      new Set(languages.map((language) => language?.title))
    ).sort()
  }, [languages])

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
