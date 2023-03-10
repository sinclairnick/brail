import Brail, {
  Button,
  Column,
  Container,
  Email,
  Image,
  Link,
  Row,
  Typography,
} from "@brail/react";
import z from "zod"; /** 👈 May need to install this */

const UNSUBSCRIBE_LINK =
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
const IMAGE_URL =
  "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80";

const b = Brail.init();

export default b.template
  .meta(z.object({}))
  .props(z.object({ firstName: z.string(), pet: z.string() }))
  .preview({ firstName: "John", pet: "Fido" })
  .view((props) => {
    return (
      <Email fontFamily="Arial">
        {/* BRANDING */}
        <Container py={48} backgroundColor="#d9ede6">
          <Row>
            <Column>
              <Typography
                as="h1"
                fontSize={32}
                color="#289770"
                textAlign="center"
              >
                🐶 Pets.com
              </Typography>
            </Column>
          </Row>
        </Container>

        {/* MAIN BODY */}
        <Container px={24} py={64} backgroundColor="white" color="#303030">
          {/* GREETING */}
          <Row py={32}>
            <Column>
              <Typography as="p" fontSize={18} mb={16}>
                Hey, {props.firstName},
              </Typography>
              <Typography fontSize={18}>
                A pet on your watchlist, <b>{props.pet}</b>, is ready for
                adoption!
              </Typography>
            </Column>
          </Row>

          {/* PET INFO */}
          <Row borderTop="1px solid #d0d0d0">
            <Column align="left" width={200} p={32}>
              <Image src={IMAGE_URL} />
            </Column>
            <Column align="left" verticalAlign="middle">
              <Typography color="#353535" as="h3">
                {props.pet} likes long walks on the beach
              </Typography>
              <Typography color="#6c6c6c">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                vestibulum egestas est, in iaculis dui sollicitudin nec. Donec
                sagittis tempus turpis sit amet interdum. Mauris cursus orci sit
                amet vehicula luctus.
              </Typography>
              <Button
                href="https://pets.com/fido"
                px={42}
                py={12}
                backgroundColor="#00120b"
                color="#fdfffe"
                borderRadius={8}
                fontWeight="bold"
                fontSize={14}
                mt={16}
              >
                View {props.pet} ≫
              </Button>
            </Column>
          </Row>
        </Container>

        {/* RECOMMENDATIONS SECTION */}
        <Container backgroundColor={"#2d2d2d"} p={32}>
          <Row>
            <Column>
              <Typography
                textAlign="center"
                color="#e6e6e6"
                fontSize={18}
                fontWeight="bold"
              >
                Or check out these other little guys
              </Typography>
              <Row py={32} stackDirection="reverse">
                {["🐶", "🐱", "🐰"].map((emoji) => {
                  return (
                    <Column key={emoji} align="center">
                      <Typography fontSize={92}>{emoji}</Typography>
                    </Column>
                  );
                })}
              </Row>
            </Column>
          </Row>
        </Container>
        <Container p={64} color="#686868">
          <Row pb={16}>
            <Column align="center">
              <Link href={UNSUBSCRIBE_LINK}>
                <Typography textDecoration="underline">Unsubscribe</Typography>
              </Link>
            </Column>
          </Row>
          <Row>
            <Column align="center">
              <Typography>©️ pets.com</Typography>
            </Column>
          </Row>
        </Container>
      </Email>
    );
  });
