import {useState} from 'react';
import { LanguageSelect } from 'language-select';
import styled from '@emotion/styled';


const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  
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
           <div>
            Select a resource:
           </div>
          </div>
        </div>
      </div>
    </StyledPage>
  );
}

export default Index;
