import styled from '@emotion/styled';
import { TextField, Button, Typography } from '@mui/material';

const StyledLanguageSelect = styled.div`
  border: 1px solid;
`;
export function LanguageSelect(props) {
  return (
    <StyledLanguageSelect>
      <Typography variant="h3" color="initial">
        Language Select Component
      </Typography>
      <TextField placeholder="Select your language"></TextField>
      <Button>Select</Button>
    </StyledLanguageSelect>
  );
}
export default LanguageSelect;
