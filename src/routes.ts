import { Router } from "express";
import { verifyWebhook, receiveMessage } from "./controllers/webhook.controller.ts";
import { listMessages } from "./controllers/messages.controller.ts";

const router = Router();

// Webhook
router.get("/webhook", verifyWebhook);
router.post("/webhook", receiveMessage);

// Consulta
router.get("/messages/:phone", listMessages);

export default router;
