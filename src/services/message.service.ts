interface StoredMessage {
  from: string;
  body: string;
  timestamp: string;
}

const messages: StoredMessage[] = [];

export const saveMessage = (msg: StoredMessage) => {
  messages.push(msg);
};

export const getMessagesByPhone = (phone: string) => {
  return messages.filter(m => m.from === phone);
};

export const autoReply = (text: string) => {
  const msg = text.toLowerCase();

  if (["oi", "olá"].includes(msg)) {
    return { reply: "Olá! 😊 Como posso ajudar hoje?" };
  }

  if (["preço", "valor"].includes(msg)) {
    return { reply: "Tabela de preços:\n- Plano Básico: R$ 29,90\n- Plano Pro: R$ 59,90" };
  }

  if (msg === "ajuda") {
    return { reply: "Menu de ajuda:\n1 - Ver preços\n2 - Falar com atendente\n3 - Informações gerais" };
  }

  return { reply: "Desculpe, não entendi. Digite 'ajuda' para ver as opções." };
};
