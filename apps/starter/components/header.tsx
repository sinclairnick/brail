import { Column, Row, Typography } from '@brail/react';
import { theme } from './theme';

export const Header = () => {
  return (
    <Row
      paddingTop={16}
      paddingBottom={16}
      backgroundColor={theme.palette.primary.contrastText}
    >
      <Column>
        <Typography variant="h1">::: Brail</Typography>
      </Column>
    </Row>
  );
};
