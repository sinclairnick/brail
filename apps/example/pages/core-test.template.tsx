import { Core } from '@brail/react';

const T = () => {
  return (
    <Core.Email>
      <Core.Container padding={16} backgroundColor="lightyellow">
        <Core.Row>
          <Core.Column>
            <Core.Text fontSize={"28px"} fontWeight="bold">Welcome To Brail</Core.Text>
          </Core.Column>
        </Core.Row>
      </Core.Container>
    </Core.Email>
  );
};

export default T;
