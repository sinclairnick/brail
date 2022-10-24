import { createTemplate } from '@brail/core';
import { Column, EmailTemplate, Image, Row, Text } from '@brail/react';
import { getAbsoluteSrc } from 'apps/example/lib/path';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class Notification {
  @IsString()
  title: string;
  @IsString()
  from: string;
}

export class NotificationEmailTemplateProps {
  @ValidateNested({ each: true })
  @Type(() => Notification)
  notifications: Notification[];
}

const ReusableHeader = () => {
  return (
    <Row>
      <Column>
        <Image src={getAbsoluteSrc('/brail.png')} />
      </Column>
    </Row>
  );
};

const AnotherNotificationEmailTemplate = (
  props: NotificationEmailTemplateProps
) => {
  return (
    <>
      <EmailTemplate
        title="Another Notification Template"
        preview={`We found ${props.notifications.length} notifications`}
      >
        <ReusableHeader />
        <Row paddingTop={20}>
          <Column>
            <Text variant="h1">This is another email template!</Text>
          </Column>
        </Row>
      </EmailTemplate>
    </>
  );
};

export const AnotherNotificationTemplate = createTemplate({
  name: 'Another Notification',
  template: AnotherNotificationEmailTemplate,
  meta: (props) => ({}),
  path: '/another-notification',
  preview: () => ({
    notifications: [{ from: 'Elon Musk', title: 'New tweet' }],
  }),
  propType: NotificationEmailTemplateProps,
});

export default AnotherNotificationTemplate;
