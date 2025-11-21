# MHC

API Simples que simula a integração básica com WhatsApp Business API da Meta.

Link para aplicação em execução: `mhc-production-e907.up.railway.app`

# Requisitos

docker e docker-compose

# Como executar
Para executar a aplicação rodando a porta 3000
```
docker-compose up --build
```
---

Para executar os testes automatizados

```
docker-compose run --rm tests
```

# Decisões técnicas

- Node com Express e Typescript para desenvolvimento acelerado de aplicações e tipagem
- Jest como framework de Test
- Docker com docker-compose para gerenciamento de containers e serviços
- Openai para uma conversa mais fluida sem exemplos estáticos e com fallback caso a openai esteja indisponível para que a conversa não quebre
- Deploy disnponível no Railway
- Separação de responsabilidades em services e controllers

# Rotas

### GET /webhook
#### params
```
hub.mode=subscribe
hub.verify_token=<str>
hub.challenge=<str>
```
#### Response example
```
1122
```
### POST /webhook
#### Response example
```json
{
    "status": "message_received",
    "received": {
        "from": "16315551181",
        "text": "olá",
        "timestamp": "1504902988"
    },
    "auto_reply": "Bem-vindo à MHC - Making Health Cool! Como posso ajudar você hoje?"
}
```
### GET/messages/:phone
#### Response example
```JSON
{
    "phone": "16315551181",
    "messages": [
        {
            "from": "16315551181",
            "body": "olá",
            "timestamp": "1504902988"
        }
    ]
}
```

# Exemplos de Curl

### Validar Webhook

```curl
curl --location 'http://127.0.0.1:3000/webhook?hub.mode=subscribe&hub.verify_token=5ZeQD5GKDfjEUKTozGyLS5cobSCH2hgpECMUPxlM2O1ycAjFHKaXQc259aP3Brgx&hub.challenge=1122' \
--data ''
```


### Post de mensagem
A rota de mensagens está configura com o OpenAI para trazer uma conversa mais fluida. Você não precisar se limitar aos comandos descritos no teste, pode utilizar linguagem mais informal ou abreviações.
```curl
curl --location 'http://127.0.0.1:3000/webhook' \
--header 'Content-Type: application/json' \
--data '{
  "field": "messages",
  "value": {
    "messaging_product": "whatsapp",
    "metadata": {
      "display_phone_number": "16505551111",
      "phone_number_id": "123456123"
    },
    "contacts": [
      {
        "profile": {
          "name": "test user name"
        },
        "wa_id": "16315551181"
      }
    ],
    "messages": [
      {
        "from": "16315551181",
        "id": "ABGGFlA5Fpa",
        "timestamp": "1504902988",
        "type": "text",
        "text": {
          "body": "Olá, bom dia!"
        }
      }
    ]
  }
}'
```

### Ver mensagens de um número
```
curl --location 'http://127.0.0.1:3000/messages/<PHONE_NUMBER>' \
--data ''
```

```
curl --location 'http://127.0.0.1:3000/messages/<PHONE_NUMBER>' \
--data ''
```
