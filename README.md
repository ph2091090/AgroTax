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

A ideia central é simples: por meio de uma **calculadora tributária online**, o usuário informa o produto, o valor da operação, o regime tributário e o tipo de operação. O sistema então calcula uma estimativa dos principais tributos aplicáveis e apresenta o resultado de forma clara.

O **AgroTax** também disponibiliza um **Guia Fiscal**, com explicações sobre os principais tributos, e uma página **Sobre**, apresentando as informações e a base legal utilizada pelo sistema.

**Principais objetivos:**
- Facilitar a estimativa de tributos em operações do agronegócio.
- Reunir informações tributárias em uma interface simples.
- Considerar diferentes produtos e tipos de operações agrícolas.
- Considerar os regimes tributários disponíveis no sistema.
- Aplicar as regras de isenções e benefícios fiscais cadastrados.
- Apresentar o valor estimado dos tributos e da carga tributária.
- Servir como ferramenta de referência antes da consulta a um profissional especializado.

> Os resultados apresentados pelo AgroTax são **estimativas** e não substituem a análise de um contador ou especialista tributário.

---

## Funcionalidades

- **Calculadora tributária online** para operações do agronegócio.
- **Seleção de produtos agrícolas** para realização dos cálculos.
- **Cálculo de ICMS, IPI, PIS/COFINS, Funrural e SENAR** conforme as regras cadastradas.
- **Aplicação de isenções e benefícios fiscais** previstos nas regras do sistema.
- **Seleção do regime tributário**, entre Simples Nacional, Lucro Presumido e Lucro Real.
- **Seleção do tipo de operação**, como compra, venda, importação e exportação.
- **Exibição do valor líquido estimado** após os tributos.
- **Exibição da carga tributária percentual**.
- **Guia Fiscal** com explicações sobre os tributos.
- **Página Sobre** com informações sobre o projeto e a base legal utilizada.
- **API RESTful** para processamento das simulações.
- **Banco de dados SQLite** para armazenamento dos produtos, regras e simulações.

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
agrotax/
├── api/                          # Servidor Backend em Node.js
│   ├── db/                       # Banco de dados SQLite
│   │   └── agrotax.db            # Arquivo da base de dados local
│   ├── src/
│   │   ├── config/
│   │   │   └── conexaoBanco.js   # Inicialização e conexão do SQLite
│   │   ├── controladores/
│   │   │   └── calculadoraControlador.js # Regras de cálculo tributário
│   │   ├── rotas/
│   │   │   └── calculadoraRotas.js # Endpoints da calculadora
│   │   ├── utilitarios/
│   │   │   ├── calculadoraTributaria.js # Cálculos dos tributos
│   │   │   └── validadores.js    # Validação dos dados recebidos
│   │   ├── app.js                # Configuração do Express e middlewares
│   │   └── server.js             # Inicialização do servidor
│   ├── .env                      # Variáveis de ambiente
│   ├── iniciarBanco.js           # Criação das tabelas do banco
│   └── package.json              # Dependências e scripts
│
├── frontend/                     # Interface Web
│   ├── css/
│   │   └── estilo.css            # Estilos adicionais
│   ├── js/
│   │   ├── app.js                # Lógica principal do site
│   │   └── calculadora.js        # Lógica da calculadora tributária
│   ├── index.html                # Página inicial e calculadora
│   ├── guia-fiscal.html          # Guia Fiscal
│   └── sobre.html                # Página Sobre
│
├── .gitignore                    # Arquivos ignorados pelo Git
└── README.md                     # Este arquivo
