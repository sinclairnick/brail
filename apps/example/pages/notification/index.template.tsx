import {
  Column,
  ColumnGroup,
  Container,
  EmailTemplate,
  Image,
  Row,
  Text,
} from '@brail/react';
import { createTemplate } from '@brail/core';

export type NotificationEmailTemplateProps = {
  notifications: Array<{ title: string; from: string }>;
};

const ReusableHeader = () => {
  return (
    <Row>
      <Column>
        <Image src={'/brail.png'} />
      </Column>
    </Row>
  );
};

const NotificationEmailTemplate = (props: NotificationEmailTemplateProps) => {
  return (
    <>
      <EmailTemplate
        title="New notifications"
        preview={`We found ${props.notifications.length} notifications`}
      >
        <ReusableHeader />
        <Row>
          <Column>
            <Text variant="h1">
              You've got {props.notifications.length} new notifications!
            </Text>
          </Column>
        </Row>

        <Container paddingTop={100}>
          {props.notifications.map((noti) => {
            return (
              <Row>
                <ColumnGroup>
                  <Column>
                    <Text variant="h3">{noti.title}</Text>
                  </Column>
                  <Column>
                    <Text>{noti.from}</Text>
                  </Column>
                </ColumnGroup>
              </Row>
            );
          })}
        </Container>
      </EmailTemplate>
    </>
  );
};

export default createTemplate(NotificationEmailTemplate, {
  previewData: {
    notifications: [
      { title: 'Jennie liked your post', from: 'Jennie Smith' },
      { title: 'Walmart replied', from: 'Walmart NY' },
      { title: 'Update security settings', from: 'Facebook Security' },
    ],
  },
});
