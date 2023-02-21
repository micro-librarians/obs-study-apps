import {useState} from 'react';
import styled from '@emotion/styled';
import { LanguageSelect } from 'language-select';
import { ObsFrame } from 'obs-frame';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.@emotion/styled file.
   */
  const [url, setUrl] = useState('')
  const parseSelectedLanguage = (langObject) => {
    setUrl(langObject.zipball_url)
  }
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <LanguageSelect selectedLanguage={parseSelectedLanguage} />
            <ObsFrame url={url} />
          </div>
        </div>
      </div>
    </StyledPage>
  );
}

export default Index;
