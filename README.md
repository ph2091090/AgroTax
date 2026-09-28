# Novictium

### Integrantes
- **Victor**
- **Pedro**
- **Tauã**
- **Icaro**
- **Henrique**

---

## Sobre o Projeto

O **Novictium** é uma plataforma web criada para ajudar pessoas que enfrentam各种de vícios — como álcool, drogas, jogos eletrônicos, aposta compulsiva, entre outros — a darem o primeiro passo em direção à recuperação.

A ideia central é simples e poderosa: por meio de uma **Landing Page** acessível e acolhedora, qualquer pessoa que esteja sofrendo com um vício ou conheça alguém nessa situação pode preencher um formulário rápido e entrar em contato com profissionais e instituições especializadas em tratamento e acolhimento.

O **Novictium** não substitui atendimento profissional, mas funciona como uma **ponte de conexão** entre quem precisa de ajuda e quem está preparado para oferecê-la.

**Principais objetivos:**
- Democratizar o acesso a informações sobre tratamento de vícios.
- Reduzir a barreira da vergonha e do silêncio ao facilitar o contato inicial.
- Conectar leads interessados a profissionais qualificados e instituições de apoio.
- Oferecer um canal simples, rápido e seguro para quem busca ajuda.

---

## Funcionalidades

- **Landing Page responsiva** com linguagem acessível e acolhedora.
- **Formulário de captura de leads** com validação em tempo real.
- **API RESTful** para cadastro, validação e armazenamento de contatos.
- **Banco de dados SQLite** para persistência leve e local dos dados.
- **Painel de listagem** para visualização dos leads cadastrados.

---

## Tecnologias Utilizadas

### Backend (API RESTful)
- **Node.js** — Ambiente de execução JavaScript no servidor.
- **Express.js** — Framework web para rotas e middlewares.
- **better-sqlite3** — Driver síncrono para banco de dados SQLite.
- **Helmet** — Middleware de segurança HTTP.
- **CORS** — Habilitação de Cross-Origin Resource Sharing.
- **Validator** — Validação e sanitização de dados de entrada.
- **Dotenv** — Gerenciamento de variáveis de ambiente.

### Frontend (Interface do Usuário)
- **HTML5 Semântico** — Marcação acessível e estruturada.
- **Tailwind CSS** — Framework CSS utilitário para design responsivo.
- **JavaScript ES6+ (Vanilla)** — Lógica do cliente, manipulação do DOM e chamadas assíncronas via `fetch`.

---

## Estrutura do Projeto

```text
novictium/
├── api/                          # Servidor Backend em Node.js
│   ├── db/                       # Banco de dados SQLite (criado em runtime)
│   │   └── landing.db            # Arquivo da base de dados local
│   ├── src/
│   │   ├── config/
│   │   │   └── conexaoBanco.js   # Inicialização e conexão do SQLite
│   │   ├── controladores/
│   │   │   └── leadControlador.js# Regras de negócio da API
│   │   ├── rotas/
│   │   │   └── leadRotas.js      # Endpoints da aplicação
│   │   ├── utilitarios/
│   │   │   └── validadores.js    # Sanitização e validação dos inputs
│   │   ├── app.js                # Configuração do Express e middlewares
│   │   └── server.js             # Inicialização do servidor
│   ├── .env                      # Variáveis de ambiente
│   ├── iniciarBanco.js           # Criação da tabela de leads
│   └── package.json              # Dependências e scripts
│
├── frontend/                     # Interface Web (Landing Page)
│   ├── css/
│   │   └── estilo.css            # Estilos adicionais
│   ├── js/
│   │   └── app.js                # Lógica client-side
│   └── index.html                # Estrutura visual da Landing Page
│
├── .gitignore                    # Arquivos ignorados pelo Git
└── README.md                     # Este arquivo
```

---

## Modelagem do Banco de Dados (SQLite)

O banco de dados é inicializado automaticamente ao iniciar a aplicação.

### Tabela `leads`

```sql
CREATE TABLE IF NOT EXISTS leads (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_completo       TEXT    NOT NULL,
    email               TEXT    NOT NULL,
    telefone_whatsapp   TEXT    NOT NULL,
    mensagem            TEXT    DEFAULT NULL,
    data_cadastro       TEXT    DEFAULT (datetime('now','localtime')),
    status_atendimento  TEXT    DEFAULT 'novo'
                                CHECK(status_atendimento IN ('novo','contatado','convertido','perdido'))
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status_atendimento);
```

---

## Endpoints da API

| Método | Endpoint | Descrição | Payload (Body) |
|---|---|---|---|
| `GET` | `/` | Página inicial da Landing Page | — |
| `GET` | `/api/health` | Verificação de saúde da API | — |
| `POST` | `/api/leads` | Cadastra um novo lead | JSON (nome, email, telefone, mensagem) |
| `GET` | `/api/leads` | Lista todos os leads cadastrados | — |

### Exemplo de Requisição `POST /api/leads`

**Body (JSON):**
```json
{
  "nome_completo": "Maria Silva",
  "email": "maria.silva@exemplo.com",
  "telefone_whatsapp": "(11) 98888-7777",
  "mensagem": "Gostaria de saber mais sobre tratamento."
}
```

**Resposta de Sucesso (HTTP 201):**
```json
{
  "sucesso": true,
  "mensagem": "Lead cadastrado com sucesso!"
}
```

**Resposta de Erro de Validação (HTTP 422):**
```json
{
  "sucesso": false,
  "mensagem": "E-mail inválido.",
  "erros": [
    "Informe um endereço de e-mail válido."
  ]
}
```

---

## Como Executar o Projeto

### Pré-requisitos
- **Node.js** (v18 ou superior) e **npm** instalados.
- **Git** instalado.

**Para instalar o Node.js e Git no Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install -y nodejs npm git
```

### Iniciar o Projeto

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Navegue até a pasta `api` e instale as dependências:
   ```bash
   cd novictium/api
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   - **Landing Page:** [http://localhost:3000/](http://localhost:3000/)
   - **Health Check:** [http://localhost:3000/api/health](http://localhost:3000/api/health)

### Parar o Servidor

Pressione **`Ctrl` + `C`** no terminal.

Se a porta 3000 estiver ocupada:
```bash
sudo fuser -k 3000/tcp
# ou
npx kill-port 3000
```

---

## Segurança e Boas Práticas

- **Prepared Statements:** Consultas preparadas via `better-sqlite3` prevenindo ataques de SQL Injection.
- **Sanitização de Entradas:** Limpeza de dados com a biblioteca `validator` para evitar XSS.
- **Proteção contra Payload Abusivo:** Middleware configurado com limite de 10KB por requisição.
- **Respostas Padronizadas:** Códigos HTTP semânticos (200, 201, 400, 422, 500).

---

## Licença

Projeto desenvolvido para fins educacionais e acadêmicos. Sinta-se à vontade para utilizar como base para seus próprios aprendizados.
