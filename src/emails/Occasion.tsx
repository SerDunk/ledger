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

interface OccasionEmailProps {
  userFirstname: string;
  occasionType: "birthday" | "anniversary";
  occasionDate: Date | null;
}

export const Occasion = ({
  userFirstname,
  occasionType,
  occasionDate,
}: OccasionEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>{`Reminder: ${userFirstname}'s ${occasionType}`}</Preview>
      <Container style={container}>
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          {`It is ${userFirstname}'s ${occasionType} today! 🎉`}
        </Text>
        <Text style={paragraph}>Date: {occasionDate?.toDateString()}</Text>
        <Text style={paragraph}>
          Make sure to wish {userFirstname} a happy {occasionType}!
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
  occasionType: "birthday",
  occasionDate: new Date(),
} as OccasionEmailProps;

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
