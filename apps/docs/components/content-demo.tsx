import { Column, Container, Email, Row } from "@brail/react";
import { Colors } from "@constants/index";
import { PropsWithChildren } from "react";
import { Demo, DemoProps } from "./demo";

export type ContentDemoProps = PropsWithChildren<DemoProps>;

export const ContentDemo = (props: ContentDemoProps) => {
  const { children, ...rest } = props;

  return (
    <Demo {...rest}>
      <Email backgroundColor={Colors.grey100}>
        <Container backgroundColor="white" p={16}>
          <Row>
            <Column align="center">{children}</Column>
          </Row>
        </Container>
      </Email>
    </Demo>
  );
};
