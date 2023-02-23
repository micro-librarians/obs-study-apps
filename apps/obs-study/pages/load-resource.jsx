import styled from '@emotion/styled'

const StyledPage = styled.div`
  .page {
  }
`

const baseURL = 'https://git.door43.org/'

export function LoadResourcePage() {
  const onChange = (evt) => {
    var file = evt.target.files[0]
    var reader = new FileReader()
    reader.onload = function (e) {
      const owner = 'ru_gl'
      const repo = 'uploaded'
      caches.open('obs-zip').then(function (cache) {
        let blob = new Blob([reader.result])
        var init = { status: 200, statusText: 'OK' }
        let res = new Response(blob, init)
        const uri = baseURL + owner + '/' + repo + '/archive/' + file.name
        let req = new Request(uri)
        cache.put(req, res)
      })
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div>
            <input
              type="file"
              onChange={onChange}
              name="file"
              className="file"
              accept=".zip"
            />
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default LoadResourcePage
