import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API funcionando com TypeScript2!");
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
