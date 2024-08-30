```markdown
# Volun API

Esta é a API para o projeto de voluntariado **Volun**, desenvolvida em Node.js e utilizando Firebase Firestore como banco de dados.

## Tecnologias Utilizadas

- **Node.js** - Plataforma de desenvolvimento backend.
- **Express.js** - Framework para construção da API.
- **Firebase Admin SDK** - Integração com o Firebase Firestore para manipulação de dados.
- **Vercel** - Hospedagem e deploy da API.

## Estrutura do Projeto

```
volun-api/
│
├── controllers/
│   ├── usuariosController.js
│   ├── advertenciasController.js
│   ├── loginController.js
│   ├── organizacaoController.js
│   ├── eventosController.js
│   ├── enderecoController.js
│   ├── eventoHistoricoController.js
│   ├── comentariosController.js
│   ├── denunciasController.js
│   ├── acoesModeracaoController.js
│   └── logsModeracaoController.js
│
├── routes/
│   ├── usuarios.js
│   ├── advertencias.js
│   ├── login.js
│   ├── organizacao.js
│   ├── eventos.js
│   ├── endereco.js
│   ├── eventoHistorico.js
│   ├── comentarios.js
│   ├── denuncias.js
│   ├── acoesModeracao.js
│   └── logsModeracao.js
│
├── config/
│   └── firebase-config.js
│
├── App.js
├── index.js
├── package.json
├── .gitignore
└── README.md
```

## Configuração e Instalação

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/jardel-monte/volun-api.git
   cd volun-api
   ```

2. **Instale as Dependências**
   ```bash
   npm install
   ```

3. **Configuração do Firebase**
   - Baixe o arquivo `serviceAccountKey.json` do Firebase Console.
   - Coloque-o no diretório `config/` e faça a importação do mesmo no arquivo `firebase-config.js`.
   - **Importante:** Faça isso apenas para testar a API localmente. Não inclua este arquivo no controle de versão. Adicione-o ao arquivo `.gitignore`.

4. **Variáveis de Ambiente**
   - Crie um arquivo `.env` na raiz do projeto para armazenar as credenciais e outras variáveis de ambiente necessárias.

5. **Inicie o Servidor**
   ```bash
   node index.js
   ```

## Endpoints da API

### **Usuários**
- **GET /usuarios**: Retorna todos os usuários.
- **GET /usuarios/:id**: Retorna um usuário específico pelo ID.
- **POST /usuarios**: Cria um novo usuário.
- **PUT /usuarios/:id**: Atualiza um usuário existente pelo ID.
- **DELETE /usuarios/:id**: Deleta um usuário pelo ID.

### **Advertências**
- **GET /advertencias**: Retorna todas as advertências.
- **GET /advertencias/:id**: Retorna uma advertência específica pelo ID.
- **POST /advertencias**: Cria uma nova advertência.
- **PUT /advertencias/:id**: Atualiza uma advertência existente pelo ID.
- **DELETE /advertencias/:id**: Deleta uma advertência pelo ID.

### **Login**
- **POST /login**: Realiza o login do usuário.
- **GET /login/:id**: Retorna as informações de login de um usuário específico pelo ID.
- **PUT /login/:id**: Atualiza as informações de login de um usuário pelo ID.
- **DELETE /login/:id**: Deleta as informações de login de um usuário pelo ID.

### **Organização**
- **GET /organizacao**: Retorna todas as organizações.
- **GET /organizacao/:id**: Retorna uma organização específica pelo ID.
- **POST /organizacao**: Cria uma nova organização.
- **PUT /organizacao/:id**: Atualiza uma organização existente pelo ID.
- **DELETE /organizacao/:id**: Deleta uma organização pelo ID.

### **Eventos**
- **GET /eventos**: Retorna todos os eventos.
- **GET /eventos/:id**: Retorna um evento específico pelo ID.
- **POST /eventos**: Cria um novo evento.
- **PUT /eventos/:id**: Atualiza um evento existente pelo ID.
- **DELETE /eventos/:id**: Deleta um evento pelo ID.

### **Endereço**
- **GET /endereco**: Retorna todos os endereços.
- **GET /endereco/:id**: Retorna um endereço específico pelo ID.
- **POST /endereco**: Cria um novo endereço.
- **PUT /endereco/:id**: Atualiza um endereço existente pelo ID.
- **DELETE /endereco/:id**: Deleta um endereço pelo ID.

### **Histórico de Eventos**
- **GET /evento-historico**: Retorna todo o histórico de eventos.
- **GET /evento-historico/:id**: Retorna o histórico de eventos específico pelo ID.
- **POST /evento-historico**: Adiciona um novo histórico de participação em eventos.
- **PUT /evento-historico/:id**: Atualiza um histórico de eventos existente pelo ID.
- **DELETE /evento-historico/:id**: Deleta um histórico de eventos pelo ID.

### **Comentários**
- **GET /comentarios**: Retorna todos os comentários.
- **GET /comentarios/:id**: Retorna um comentário específico pelo ID.
- **POST /comentarios**: Cria um novo comentário.
- **PUT /comentarios/:id**: Atualiza um comentário existente pelo ID.
- **DELETE /comentarios/:id**: Deleta um comentário pelo ID.

### **Denúncias**
- **GET /denuncias**: Retorna todas as denúncias.
- **GET /denuncias/:id**: Retorna uma denúncia específica pelo ID.
- **POST /denuncias**: Cria uma nova denúncia.
- **PUT /denuncias/:id**: Atualiza uma denúncia existente pelo ID.
- **DELETE /denuncias/:id**: Deleta uma denúncia pelo ID.

### **Ações de Moderação**
- **GET /acoes-moderacao**: Retorna todas as ações de moderação.
- **GET /acoes-moderacao/:id**: Retorna uma ação de moderação específica pelo ID.
- **POST /acoes-moderacao**: Registra uma nova ação de moderação.
- **PUT /acoes-moderacao/:id**: Atualiza uma ação de moderação existente pelo ID.
- **DELETE /acoes-moderacao/:id**: Deleta uma ação de moderação pelo ID.

### **Logs de Moderação**
- **GET /logs-moderacao**: Retorna todos os logs de moderação.
- **GET /logs-moderacao/:id**: Retorna um log de moderação específico pelo ID.
- **POST /logs-moderacao**: Cria um novo log de moderação.
- **PUT /logs-moderacao/:id**: Atualiza um log de moderação existente pelo ID.
- **DELETE /logs-moderacao/:id**: Deleta um log de moderação pelo ID.

## Deploy

Esta API está atualmente hospedada no Vercel.

Para fazer deploy:
   ```bash
   vercel
   ```

## Contribuições

Sinta-se à vontade para enviar pull requests ou abrir issues para melhorias.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).