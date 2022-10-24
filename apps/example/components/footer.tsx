import { Column, Row, Typography } from '@brail/react';

export const Footer = () => {
  return (
    <Row backgroundColor={'lightgray'} paddingTop={16} paddingBottom={32}>
      <Column>
        <Typography align="center">&copy; Brail</Typography>
      </Column>
    </Row>
  );
};
