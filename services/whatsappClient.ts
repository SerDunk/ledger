import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

let client: Client;

export function initialiseWhatsappClient() {
  client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Whatsapp client is ready");

    client.initialize();
  });
}

export async function sendMessage(message: string): Promise<void> {
  const whatsappNumber = process.env.WHATSAPP_NUMBER;

  try {
    await client.sendMessage(whatsappNumber!, message);
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
