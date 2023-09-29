const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getCoordinates", async (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;

  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    const response = await axios.get(nominatimUrl);
    const data = await response.data;

    // Manipule os dados de resposta do Nominatim como necessário
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Erro ao consultar o Nominatim:", error);
    res.status(500).json({ error: "Erro ao consultar o Nominatim" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
