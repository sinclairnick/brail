import { Row, Column, Image } from '@brail/react';
import { getAbsoluteSrc } from '../lib/path';

export const ReusableHeader = () => {
  return (
    <Row>
      <Column>
        <Image src={getAbsoluteSrc('/cover.jpg')} />
      </Column>
    </Row>
  );
};
