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
import { BASE_URL, template } from "../../brail/react";
import { Button, Email } from "./theme";

const links = [
  {
    name: "Unsubscribe from emails like this",
    href: "{{hostedUnsubscribeUrl}}",
  },
  {
    name: "Edit email settings",
    href: "https://stackoverflow.email/subscriptions/manage?{{#data}}",
  },
  { name: "Contact us", href: "https://stackoverflow.com/company/contact" },
  { name: "Privacy", href: "Urls.Legal.PrivacyPolicy" },
] satisfies Array<{ name: string; href: string }>;

export default template
  .props(z.object({ title: z.string().optional() }))
  .metaDefault((props) => ({ subject: `Title is: ${props.title}` }))
  .preview({ title: "This is a preview" })
  .view((props) => {
    return (
      <Email>
        <Title>{props.title}</Title>
        <Container px={20} py={20}>
          <Row>
            <Column>
              <Link href="https://stackoverflow.com">
                <Image src="/so-logo.png" height={36} width={146} />
              </Link>
            </Column>
          </Row>
        </Container>

        <Container padding={2} backgroundColor="#362858" borderRadius={4}>
          <Row py={10}>
            <Column p={20}>
              <Typography fontSize={27} color="white" fontWeight="bold" py={10}>
                {props.title} (2)
              </Typography>
              <Typography fontSize={17} color="white">
                The excerpt or slogan of the email announcement can go here.
              </Typography>
              <Button mt="$5" href="#">
                Medium white button
              </Button>
            </Column>
            <Column p={20} align="center">
              <Image src="/so-image1.png" maxWidth={340} />
            </Column>
          </Row>
        </Container>

        <Container backgroundColor="#ffffff" p={20}>
          <Row color="#3c3f44">
            <Column width={128} mr={20}>
              <Image src="/so-image2.png" width={128} height={128} />
            </Column>
            <Column>
              <Typography
                fontWeight="bold"
                fontSize={17}
                lineHeight={21}
                mb={5}
                color="#0c0d0e"
                variant="h3"
              >
                Are your preferences up to date?
              </Typography>
              <Typography mb={15}>
                Make sure we are recommending the best content for you.
              </Typography>
              <Link href="#" color="#0077cc">
                Change your profile »
              </Link>
            </Column>
          </Row>
        </Container>

        <Container p={20} backgroundColor="#ffffff">
          <Row borderTop="1px solid #e0e0e0" py={30} color="#3c3f44">
            <Column>
              <Typography variant="h2" fontSize={21} mb={15} color="#0c0d0e">
                Mix and match patterns to build complex emails
              </Typography>
              <Typography variant="p">
                Think of this template as a canvas for mixing and matching email
                components. Use components and patterns as building blocks as
                you design and build new emails.
              </Typography>
            </Column>
          </Row>
        </Container>

        <Container backgroundImage="/so-blue-bg.png">
          <Row p={30}>
            <Column>
              <Typography textAlign="center" fontSize={17} color="#ffffff">
                Overlay HTML text and elements on top of a background image.
              </Typography>
            </Column>
          </Row>
        </Container>

        <Container p={20}>
          <Row pb={10}>
            <Column>
              <Typography color="#9199a1" fontSize={12}>
                You're receiving this email because $reason$.
              </Typography>
            </Column>
          </Row>
          <Row>
            <Column fontSize={12} color="#9199a1" textDecoration="underline">
              {links.map((l) => {
                return (
                  <Link href={l.href} key={l.name} inline>
                    <Typography mr={16}>{l.name}</Typography>
                  </Link>
                );
              })}
            </Column>
          </Row>
        </Container>
      </Email>
    );
  });
