export function getLanguagesFromResources(resources) {
  return resources?.map((res) => {
    return {
      title: res.language_title,
      id: res.language,
      direction: res.language_direction,
      isGl: res.language_is_gl,
    }
  })
}
