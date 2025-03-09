import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

export const Occasion = ({ userFirstname }: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>The easy-to-use book keeping platform</Preview>
      <Container style={container}>
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          It is users birthday or anniversary today. Make sure to wish user a
          happy anniversary/happy birthday
        </Text>

        <Text style={paragraph}>
          Best,
          <br />
          Ledger
        </Text>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

Occasion.PreviewProps = {
  userFirstname: "Saroja",
} as KoalaWelcomeEmailProps;

export default Occasion;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};
