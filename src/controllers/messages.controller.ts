import type { Request, Response } from "express";
import { getMessagesByPhone } from "../services/message.service.ts";

export const listMessages = (req: Request, res: Response) => {
  const phone = req.params.phone!;

  const msgs = getMessagesByPhone(phone);

  return res.json({
    phone,
    messages: msgs
  });
};
