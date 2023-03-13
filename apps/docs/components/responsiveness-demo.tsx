import { Email, Container, Row, Column, Typography } from "@brail/react";
import { Colors } from "@constants/index";
import { useState } from "react";
import { Demo } from "./demo";
import React from "react";

const colors = ["#00800043", "#ffa60039", "#ff000035"];

export const ResponsivenessDemo = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [isStacked, setIsStacked] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const stackDirection = isReversed ? "reverse" : "normal";

  return (
    <div>
      <div style={{ display: "flex", columnGap: 32 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            id="mobile"
            type="checkbox"
            checked={isMobile}
            onChange={(e) => setIsMobile(Boolean(e.target.checked))}
          />
          <label style={{ marginLeft: 8 }} htmlFor="mobile">
            Mobile Viewport?
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            id="stack"
            type="checkbox"
            checked={isStacked}
            onChange={(e) => setIsStacked(Boolean(e.target.checked))}
          />
          <label style={{ marginLeft: 8 }} htmlFor="stack">
            Stack
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            id="reverse"
            type="checkbox"
            checked={isReversed}
            onChange={(e) => setIsReversed(Boolean(e.target.checked))}
          />
          <label style={{ marginLeft: 8 }} htmlFor="reverse">
            Reverse-stacked
          </label>
        </div>
      </div>
      <Demo
        style={{
          height: 400,
          width: isMobile ? 480 : undefined,
          border: "1px solid grey",
        }}
      >
        <Email backgroundColor={Colors.grey100} fontFamily="Arial">
          <Container py={16} px={16} backgroundColor="white">
            {[
              `<Row`,
              `stack={${isStacked}}`,
              `stackDirection="${stackDirection}"`,
              `/>`,
            ].map((line, i) => {
              return (
                <Row
                  fontSize={14}
                  color={Colors.brail}
                  fontWeight="bold"
                  fontFamily="Courier New, monospace"
                  backgroundColor={Colors.brailLight}
                  px={32}
                  py={4}
                  stack
                >
                  <Column>
                    <Typography>{line}</Typography>
                  </Column>
                </Row>
              );
            })}
          </Container>
          <Container py={16} px={16} backgroundColor="white">
            <Row stack={isStacked} stackDirection={stackDirection}>
              {[1, 2, 3].map((i) => (
                <Column key={i} backgroundColor={colors[i - 1]} py={16}>
                  <Typography
                    textAlign="center"
                    fontWeight="bold"
                    color="black"
                  >
                    Column {i}
                  </Typography>
                </Column>
              ))}
            </Row>
          </Container>
        </Email>
      </Demo>
    </div>
  );
};
