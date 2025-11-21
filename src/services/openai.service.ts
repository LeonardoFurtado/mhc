import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY as string,
});

const obterRespostaReceita = async (question: string): Promise<string | undefined> => {
  try {
    const completation = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Você é um funcionário da MHC - Making Health Cool.
          Quando receber uma mensagem contendo:
          - oi, olá ou algo que sugira uma primeira iteração como bom dia, boa tarde etc: responda com boas-vindas.
          - alguma pergunta relativa a preço ou valores: responda com tabela de preços que é: Plano Básico: R$ 29,90 - Plano Pro: R$ 59,90
          - "ajuda": responde com menu de opções que contém: 1 - Ver preços 2 - Falar com atendente 3 - Informações gerais
          - "1 - Ver preços": informe a tabela de preços novamente
          - "2 - Falar com atendente": Informe que um atendente irá entrar em contato pelo chat
          - "3 - Informações gerais": Informe que a MCH é uma startup com foco em b2b2c que visa revolucionar o mundo wellnes
          ` 
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    return completation.choices[0]?.message?.content ?? undefined;
  } catch (error) {
    console.error("Erro ao chamar API OpenAI", error);
  }
};

export default obterRespostaReceita;
