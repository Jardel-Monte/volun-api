const app = require('./App');

// Porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;


// link de conexão para o mongodb caso seja necessário
// 9bppCghItqlKKErn
// mongodb+srv://jardellima23:<db_password>@volun-api.dqoev.mongodb.net/