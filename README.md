# AgroTax

### Integrantes

- **Victor**
- **Pedro**
- **Tauã**
- **Icaro**
- **Henrique**

---

## Sobre o Projeto

O **AgroTax** é uma plataforma web criada para auxiliar produtores rurais, cooperativas, contadores e profissionais do agronegócio brasileiro na **estimativa da carga tributária** de operações envolvendo produtos agrícolas.

A ideia central é simples: por meio de uma **calculadora tributária online**, o usuário informa o produto, o valor da operação, o regime tributário e o tipo de operação. O sistema então realiza uma estimativa dos principais tributos cadastrados e apresenta o resultado de forma organizada.

Além da calculadora tributária, o **AgroTax** possui um canal de contato para que usuários possam enviar mensagens para a equipe do projeto. As mensagens recebidas são armazenadas no banco de dados e podem ser encaminhadas por e-mail.

O sistema foi desenvolvido com foco em organização, facilidade de uso e integração entre frontend, backend e banco de dados.

> Os resultados apresentados pelo AgroTax são **estimativas** e não substituem a análise de um contador ou especialista tributário.

**Principais objetivos:**

- Facilitar a estimativa de tributos em operações do agronegócio.
- Reunir informações tributárias em uma interface simples.
- Permitir a seleção de produtos agrícolas cadastrados no sistema.
- Considerar diferentes regimes tributários e tipos de operação.
- Calcular uma estimativa dos tributos cadastrados.
- Apresentar o valor total estimado dos tributos.
- Apresentar o valor líquido estimado da operação.
- Apresentar a carga tributária percentual.
- Armazenar simulações realizadas no banco de dados.
- Disponibilizar um canal de contato para os usuários.
- Enviar as mensagens recebidas pelo formulário para o e-mail configurado no sistema.

---

## Funcionalidades

- **Landing Page responsiva** com apresentação do AgroTax.
- **Calculadora tributária online** para simulação de operações.
- **Seleção de produtos** cadastrados no banco de dados.
- **Cálculo de ICMS, IPI, PIS, COFINS, Funrural e SENAR** conforme as alíquotas cadastradas no sistema.
- **Seleção do regime tributário**, incluindo Simples Nacional, Lucro Presumido e Lucro Real.
- **Seleção do tipo de operação**, incluindo compra, venda, importação e exportação.
- **Exibição do valor estimado de cada tributo**.
- **Exibição do total de tributos estimado**.
- **Exibição do valor líquido da operação**.
- **Exibição da carga tributária percentual**.
- **Armazenamento das simulações** no banco de dados SQLite.
- **Formulário de contato** para envio de mensagens.
- **Validação dos dados enviados pelo formulário**.
- **Armazenamento dos leads** no banco de dados.
- **Envio de mensagens por e-mail** utilizando Nodemailer.
- **API RESTful** para comunicação entre frontend e backend.
- **Health Check** para verificar o funcionamento da API.
- **Guia Fiscal** com informações sobre os principais tributos considerados pelo sistema.

---

## Tecnologias Utilizadas

### Backend (API RESTful)

- **Node.js** — Ambiente de execução JavaScript no servidor.
- **Express.js** — Framework web para criação das rotas e middlewares.
- **better-sqlite3** — Driver síncrono para banco de dados SQLite.
- **Helmet** — Middleware utilizado para proteção de cabeçalhos HTTP.
- **CORS** — Controle de requisições entre diferentes origens.
- **Validator** — Validação e sanitização dos dados recebidos.
- **Dotenv** — Gerenciamento de variáveis de ambiente.
- **Nodemailer** — Envio de mensagens por e-mail.
- **Path** — Manipulação dos caminhos dos arquivos.
- **FS** — Verificação e criação da pasta do banco de dados.

### Frontend (Interface do Usuário)

- **HTML5 Semântico** — Estrutura das páginas e dos formulários.
- **Tailwind CSS** — Framework CSS utilizado para criação da interface responsiva.
- **JavaScript ES6+ (Vanilla)** — Lógica do cliente, manipulação do DOM e comunicação com a API por meio de `fetch`.
- **Fetch API** — Comunicação assíncrona entre o frontend e o backend.

### Banco de Dados

- **SQLite** — Banco de dados utilizado para armazenar:
  - produtos;
  - simulações;
  - leads;
  - informações relacionadas às operações cadastradas.

---

## Estrutura do Projeto

```text
agro-tax/
├── api/                                      # Servidor Backend em Node.js
│   ├── db/                                   # Banco de dados SQLite
│   │   └── landing.db                        # Arquivo da base de dados local
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── conexaoBanco.js               # Conexão e configuração do SQLite
│   │   │
│   │   ├── controladores/
│   │   │   ├── leadControlador.js            # Regras de negócio dos leads
│   │   │   └── calculadoraControlador.js     # Regras de negócio da calculadora
│   │   │
│   │   ├── rotas/
│   │   │   ├── leadRotas.js                  # Rotas relacionadas aos leads
│   │   │   └── calculadoraRotas.js           # Rotas da calculadora tributária
│   │   │
│   │   ├── utilitarios/
│   │   │   ├── validadores.js                # Validação dos dados recebidos
│   │   │   ├── calculadoraTributaria.js      # Cálculo dos tributos
│   │   │   └── email.js                      # Configuração e envio de e-mails
│   │   │
│   │   ├── app.js                            # Configuração do Express
│   │   └── server.js                          # Inicialização do servidor
│   │
│   ├── .env                                  # Variáveis de ambiente
│   ├── iniciarBanco.js                       # Criação/verificação das tabelas
│   ├── package.json                          # Dependências e scripts
│   └── package-lock.json                     # Versões das dependências
│
├── frontend/                                 # Interface Web do AgroTax
│   ├── css/
│   │   └── estilo.css                        # Estilos adicionais
│   │
│   ├── js/
│   │   ├── app.js                            # Lógica do formulário e comunicação com a API
│   │   └── tailwind.js                       # Arquivo do Tailwind utilizado pelo frontend
│   │
│   └── index.html                            # Página principal do AgroTax
│
├── doc/                                      # Documentação do projeto
│
├── .gitignore                                # Arquivos ignorados pelo Git
├── README.md                                 # Documentação principal do projeto
└── package-lock.json                         # Dependências do projeto raiz
