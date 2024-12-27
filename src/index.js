require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB, sequelize } = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

sequelize.sync({ force: false })
  .then(() => console.log("Modelos sincronizados com o banco de dados!"))
  .catch(error => console.error("Erro ao sincronizar os modelos:", error));

app.use(bodyParser.json());
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Bem-vindo ao Gerenciador de Tarefas!");
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
