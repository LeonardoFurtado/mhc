export interface WhatsAppWebhookPayload {
  entry: {
    changes: {
      value: {
        messages: {
          from: string;
          text?: {
            body: string;
          };
          timestamp: string;
        }[];
      };
    }[];
  }[];
}
