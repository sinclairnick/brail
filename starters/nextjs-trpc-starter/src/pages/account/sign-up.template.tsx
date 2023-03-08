import {
  Column,
  Container,
  Image,
  Link,
  Row,
  Title,
  Typography,
} from "@brail/react";
import z from "zod";
import { template } from "../../brail/base";
import { Email, myTheme } from "../../brail/theme";

const links = [
  { name: "Docs", url: "https://brail.dev", iconSrc: "/book.png" },
  {
    name: "GitHub",
    url: "https://github.com/sinclairnick/brail",
    iconSrc: "/github.png",
  },
] satisfies Array<{ name: string; url: string; iconSrc: string }>;

export default template
  .props(z.object({ firstName: z.string() }))
  .metaDefault((props) => ({
    subject: `Welcome to Brail, ${props.firstName}!`,
  }))
  .preview({ firstName: "mate" })
  .view((props) => {
    return (
      <Email maxWidth={600}>
        <Title>{`Welcome, ${props.firstName}`}</Title>
        <Container
          backgroundColor={myTheme.config.palette.white}
          borderBottom={`1px solid ${myTheme.config.palette.grey100}`}
          px={myTheme.config.spacing[2]}
          py={32}
        >
          <Row>
            <Column align="center">
              <Image src="/logo.png" alt="Brail logo" width={200} />
            </Column>
          </Row>
          <Row py={16}>
            <Column>
              <Typography fontSize={28} fontWeight="bold" textAlign="center">
                Welcome to Brail, {props.firstName}
              </Typography>
            </Column>
          </Row>
        </Container>
        <Container
          backgroundColor={myTheme.config.palette.white}
          borderBottom={`1px solid ${myTheme.config.palette.grey100}`}
        >
          <Row p={48}>
            <Column>
              <Typography fontSize={16}>Howdy User,</Typography>
              <Typography fontSize={16} py={16}>
                <span
                  style={{
                    color: myTheme.config.palette.brailMain,
                    display: "inline",
                    fontWeight: "bold",
                    // // The below line should raise a linting warning
                    // display: "flex",
                  }}
                >
                  Brail
                </span>{" "}
                is a magical place where templates like this take 1 minute to
                make.
              </Typography>
              <Typography fontSize={16} py={16} lineHeight={22}>
                It provides many tools to craft beautiful, responsive emails in
                idiomatic React, without compromising on correctness.
              </Typography>
            </Column>
          </Row>
          <Row pb={32}>
            {links.map((link) => {
              return (
                <Column align="center" px={32} py={16}>
                  <Link href={link.url} color="black" textDecoration="none">
                    <Image
                      src={link.iconSrc}
                      width={64}
                      height={64}
                      alt={link.name}
                    />
                    <Typography fontSize={16} fontWeight="bold" pt={16}>
                      {link.name}
                    </Typography>
                  </Link>
                </Column>
              );
            })}
          </Row>
        </Container>
        <Container>
          <Row p={32}>
            <Column>
              <Typography fontSize={16}>Place a footer here</Typography>
            </Column>
          </Row>
        </Container>
      </Email>
    );
  });
