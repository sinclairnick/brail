import { createTemplate } from '@brail/core';
import { Column, ColumnGroup, EmailTemplate, Row, Text } from '@brail/react';

export type NotificationEmailTemplateProps = {
  notifications: Array<{ title: string; from: string }>;
};

const NotificationEmailTemplate = (props: NotificationEmailTemplateProps) => {
  return (
    <>
      <EmailTemplate title="New notifications" preview="We found ">
      <Row>
        <Column>
          <Text variant="h1">You've got notifcations!</Text>
        </Column>
      </Row>
      {props.notifications.map((noti) => {
        return (
          <Row>
            <ColumnGroup>
              <Column>
                <Text>{noti.title}</Text>
              </Column>
              <Column>
                <Text>{noti.from}</Text>
              </Column>
            </ColumnGroup>
          </Row>
        );
      })}
      </EmailTemplate>
    </>
  );
};

export const template = createTemplate(NotificationEmailTemplate, {
  previewData: {
    notifications: [
      { title: 'Jennie liked your post', from: 'Jennie Smith' },
      { title: 'Walmart replied', from: 'Walmart NY' },
      { title: 'Update security settings', from: 'Facebook Security' },
    ],
  },
});

export const getStaticProps = template.getStaticProps;
