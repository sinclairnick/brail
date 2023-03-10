import { PropsWithChildren } from "react";

export type CenterContainerProps = PropsWithChildren<{
  maxWidth?: number;
}>;

export const CenterContainer = (props: CenterContainerProps) => {
  return (
    <>
      <style jsx>{`
        .center-container {
          padding-left: 32px;
          padding-right: 32px;
        }
        @media screen and (max-width: 768px) {
          .center-container {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
        @media screen and (max-width: 480px) {
          .center-container {
            padding-left: 8px;
            padding-right: 8px;
          }
        }
      `}</style>
      <div
        className="center-container"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: props.maxWidth ?? 928, width: "100%" }}>
          {props.children}
        </div>
      </div>
    </>
  );
};
