import type { Request, Response } from "express";
import { autoReply, saveMessage } from "../services/message.service.ts";

export const verifyWebhook = (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
};

export const receiveMessage = (req: Request, res: Response) => {
  try {
    const body = req.body;

    const messages = body?.entry?.[0]?.changes?.[0]?.value?.messages;

    if (!messages) {
      return res.sendStatus(200);
    }

    const msg = messages[0];
    const from = msg.from;
    const text = msg.text?.body || "";
    const timestamp = msg.timestamp;

    saveMessage({ from, body: text, timestamp });

    const reply = autoReply(text);

    return res.status(200).json({
      status: "message_received",
      received: { from, text, timestamp },
      auto_reply: reply
    });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao processar webhook" });
  }
};
