import React from 'react';
import { Text } from './text.component';
import ReactDOM from 'react-dom/server';
import { Row } from '../row/row.component';
import { Column } from '../column/column.component';

describe('Text', () => {
  test('Matches MJML', () => {
    const text = ReactDOM.renderToStaticMarkup(
      <html>
        <Row>
          <Column>
            <Text>
              <h1>Hi</h1>
            </Text>
          </Column>
        </Row>
      </html>
    );

    console.log(text);
  });
});
