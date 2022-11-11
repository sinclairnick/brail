import React from 'react';
import { Text } from './text/text.component';
import { Row } from './row/row.component';
import { Column } from './column/column.component';
import { renderToStaticMarkup } from './render/render.constants';
import { Email } from './email/email.component';
import { Container } from './container/container.component';

describe('Core', () => {
  test('Looks legit', () => {
    const text = renderToStaticMarkup(
      <Email>
        <Container padding={3}>
          <Row>
            <Column padding={2}>
              <Text fontFamily={'serif'}>Hi</Text>
            </Column>
            <Column padding={2}>
              <Text fontFamily={'serif'}>Hi</Text>
            </Column>
            <Column padding={2}>
              <Text fontFamily={'serif'}>Hi</Text>
            </Column>
          </Row>
        </Container>
      </Email>
    );

    console.log(text);
  });
});
