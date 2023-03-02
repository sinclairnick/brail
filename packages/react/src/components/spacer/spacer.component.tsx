import { Column } from "../column";
import { Row } from "../row";
import { SpacerProps } from "./spacer.types";

export const Spacer = (props: SpacerProps) => {
  const { backgroundColor, height } = props;

  return (
    <Row>
      <Column height={height} backgroundColor={backgroundColor}>
        &nbsp;
      </Column>
    </Row>
  );
};
