import { verifyWebhook } from "../../src/controllers/webhook.controller";
import { Request, Response } from "express";

jest.mock("openai");

describe("Webhook Verification", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, VERIFY_TOKEN: "MEUTOKEN" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("retorna o challenge quando o token é válido", () => {
    const req = {
      query: {
        "hub.mode": "subscribe",
        "hub.verify_token": "MEUTOKEN",
        "hub.challenge": "123456"
      }
    } as unknown as Request;

    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const res = {
      status,
      send
    } as unknown as Response;

    verifyWebhook(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith("123456");
  });

  it("retorna 403 quando o token é inválido", () => {
    const req = {
      query: {
        "hub.mode": "subscribe",
        "hub.verify_token": "WRONG",
        "hub.challenge": "123456"
      }
    } as unknown as Request;

    const sendStatus = jest.fn();

    const res = {
      sendStatus
    } as unknown as Response;

    verifyWebhook(req, res);

    expect(sendStatus).toHaveBeenCalledWith(403);
  });
});
