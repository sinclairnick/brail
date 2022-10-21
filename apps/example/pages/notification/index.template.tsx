import { createTemplate } from '@brail/core';
import {
  Button,
  Column,
  ColumnGroup,
  Container,
  EmailTemplate,
  Image,
  Row,
  Text,
} from '@brail/react';
import { getAbsoluteSrc } from 'apps/example/lib/path';
import { theme } from '../../lib/theme';
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

const NotificationEmailTemplate = (props: NotificationEmailTemplateProps) => {
  return (
    <>
      <EmailTemplate
        title="New notifications"
        preview={`We found ${props.notifications.length} notifications`}
      >
        <ReusableHeader />
        <Row>
          <Column width={500}>
            <Row paddingTop={20}>
              <Column>
                <Text variant="h1">
                  You've got {props.notifications.length} new notifications!
                </Text>
              </Column>
            </Row>

            <Container paddingTop={20}>
              {props.notifications.map((noti) => {
                return (
                  <Row key={noti.title}>
                    <ColumnGroup>
                      <Column>
                        <Text variant="h3" color={theme.palette.info.main}>
                          {noti.title}
                        </Text>
                      </Column>
                      <Column>
                        <Text>{noti.from}</Text>
                      </Column>
                    </ColumnGroup>
                  </Row>
                );
              })}
            </Container>

            <Row paddingTop={50} paddingBottom={50}>
              <Column>
                <Button>View</Button>
              </Column>
            </Row>

            <Row
              borderTop={`1px solid ${theme.palette.grey[300]}`}
              paddingTop={20}
              paddingBottom={20}
            >
              <Column>
                <Text variant="h3">Need help?</Text>
                <Text variant="h4">
                  Contact us at{' '}
                  <a href="mailto:john@apple.com">john@apple.com</a>
                </Text>
              </Column>
            </Row>
          </Column>
        </Row>
      </EmailTemplate>
    </>
  );
};

export const NotificationTemplate = createTemplate(
  {
    template: NotificationEmailTemplate,
    meta: (props) => ({}),
    path: '/notification',
    preview: () => ({
      notifications: [{ from: 'Elon Musk', title: 'New tweet' }],
    }),
  },
  NotificationEmailTemplateProps
);

export default NotificationTemplate;
