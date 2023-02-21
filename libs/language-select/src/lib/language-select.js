import { useEffect, useState, useMemo } from 'react'
import styled from '@emotion/styled'
import { Select, MenuItem, Button, Typography } from '@mui/material'
import axios from 'axios'

const StyledLanguageSelect = styled.div`
  border: 1px solid;
`
export function LanguageSelect({selectedLanguage}) {
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

  const selectLanguage = () => {
    selectedLanguage(resources.filter((el) => el.language_title === selectedResource)[0])
  }

  const langs = useMemo(() => {
    return Array.from(new Set(resources.map((el) => el?.language_title)))
  }, [resources])

  return (
    <StyledLanguageSelect>
      <Typography variant="h3" color="initial">
        Language Select Component
      </Typography>
      <Select
        label="Select language"
        value={selectedResource}
        onChange={(e) => setSelectedResource(e.target.value)}
      >
        {langs.map((language_title) => (
          <MenuItem key={language_title} value={language_title}>
            {language_title}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={selectLanguage}>Select</Button>
    </StyledLanguageSelect>
  )
}
export default LanguageSelect
