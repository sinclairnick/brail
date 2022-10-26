import { Column, Row, Typography } from '@brail/react';
import { theme } from '../lib/theme';

export const Signature = () => {
  return (
    <Row paddingTop={16} paddingBottom={16}>
      <Column>
        <Typography variant="h4" color={theme.palette.grey[700]}>
          Thanks,
        </Typography>
        <Typography variant="h4" color={theme.palette.grey[700]}>
          The Brail Team
        </Typography>
      </Column>
    </Row>
  );
};
