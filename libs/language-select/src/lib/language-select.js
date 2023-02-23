import { useEffect, useState, useMemo, useCallback } from 'react'

import axios from 'axios'

import { Autocomplete, Button, TextField } from '@mui/material'
import Link from 'next/link'

export function LanguageSelect() {
  const [resources, setResources] = useState([])
  const [listOfResources, setListOfResources] = useState([])

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
      setListOfResources(
        resources.filter((el) => el.language_title === newSelectedLanguage)
      )
    },
    [resources]
  )

  const uniqueLanguages = useMemo(() => {
    return Array.from(new Set(resources.map((el) => el?.language_title))).sort()
  }, [resources])

  return (
    <>
      <Autocomplete
        disablePortal
        options={uniqueLanguages}
        onChange={setNewSelectedLanguage}
        renderInput={(params) => (
          <TextField {...params} label="Select language" />
        )}
      />
      <div>Select a resource:</div>
      <ResourcesList listOfResources={listOfResources} />
    </>
  )
}
export default LanguageSelect

const uploadResource = (url) => {
  axios.get(url)
}

function ResourcesList({ listOfResources }) {
  return (
    <div>
      {listOfResources.map((el) => (
        <div key={el.id}>
          {el.title} ({el.owner.full_name})
          <Button onClick={() => uploadResource(el.zipball_url)}>Upload</Button>
          <Link href={`/study/${el.owner.username}/${el.name}/01:01`}>
            <Button>Open</Button>
          </Link>
        </div>
      ))}
    </div>
  )

}
