# Plano de Arquitetura — Landing Page de Alta Conversão

> **Idioma obrigatório:** 100% do código (variáveis, funções, tabelas, colunas, chaves JSON, rotas **e comentários**) em **português brasileiro**. Comentários devem descrever a lógica em PT-BR em toda função e bloco relevante.

## 1. Estrutura de Pastas

```
testenodejs/
├── api/                          # Backend Node.js
│   ├── .env                      # Variáveis de ambiente (porta, banco)
│   ├── package.json
│   ├── src/
│   │   ├── app.js                # Config Express (CORS, JSON, rotas)
│   │   ├── server.js             # Inicialização do servidor
│   │   ├── config/
│   │   │   └── conexaoBanco.js   # Conexão SQLite (better-sqlite3)
│   │   ├── controladores/
│   │   │   └── calculadoraControlador.js
│   │   ├── rotas/
│   │   │   └── calculadoraRotas.js
│   │   └── utilitarios/
│   │       └── validadores.js    # Sanitização e validação
│   │
│   ├── db/                       # Banco de dados SQLite (criado em runtime)
│   │   └── landing.db            # Arquivo do banco SQLite (gitignore)
│   │
│   └── iniciarBanco.js           # Criação das tabelas na inicialização
│
├── frontend/                     # Interface do usuário
│   ├── index.html                # Landing Page completa
│   ├── css/
│   │   └── estilo.css            # Estilos customizados + Tailwind CDN
│   └── js/
│       └── app.js                # Calculadora + Fetch API
│
├── doc/
│   └── plano_landingpage_nodejs.md   # ← Este documento
│
├── .gitignore                    # ignora node_modules, .env, api/db/
│
└── redme.md
```

---

## 2. Schema SQLite — Tabela `calculos`

O banco SQLite (`api/db/landing.db`) é criado automaticamente pelo `better-sqlite3` na primeira execução. A tabela é criada via `iniciarBanco.js`:

```sql
CREATE TABLE IF NOT EXISTS calculos (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    produto             TEXT    NOT NULL,
    valor_operacao      REAL    NOT NULL,
    tipo_operacao       TEXT    NOT NULL,
    regime_tributario   TEXT    NOT NULL,
    icms                REAL    DEFAULT 0,
    ipi                 REAL    DEFAULT 0,
    pis_cofins          REAL    DEFAULT 0,
    funrural            REAL    DEFAULT 0,
    senar               REAL    DEFAULT 0,
    total_tributos      REAL    DEFAULT 0,
    valor_liquido       REAL    DEFAULT 0,
    carga_tributaria    REAL    DEFAULT 0,
    data_calculo        TEXT    DEFAULT (datetime('now','localtime'))
);

CREATE INDEX IF NOT EXISTS idx_calculos_produto ON calculos(produto);
CREATE INDEX IF NOT EXISTS idx_calculos_tipo ON calculos(tipo_operacao);
CREATE INDEX IF NOT EXISTS idx_calculos_regime ON calculos(regime_tributario);
```

---

## 3. Arquitetura dos Endpoints da API

### 3.1 `POST /api/calculos` — Cálculo tributário

| Campo               | Tipo   | Validação                                            |
| ------------------- | ------ | ---------------------------------------------------- |
| `produto`           | string | Obrigatório, produto agrícola válido                 |
| `valor_operacao`    | number | Obrigatório, maior que zero                          |
| `tipo_operacao`     | string | Obrigatório: compra, venda, importação ou exportação |
| `regime_tributario` | string | Obrigatório: Simples, Lucro Presumido ou Lucro Real  |

**Resposta sucesso (200):**

```json
{"sucesso": true, "mensagem": "Cálculo realizado com sucesso!", "resultado": {...}}
```

**Resposta erro (422):**

```json
{"sucesso": false, "mensagem": "Dados da operação inválidos.", "erros": [...]}
```

### 3.2 `GET /api/calculos` — Listagem (uso interno)

Retorna array paginado de cálculos realizados.

### 3.3 Segurança

* `express.json({ limit: '10kb' })` — proteção contra payload excessivo
* Sanitização com `validator` (trim, escape, stripLow)
* **Prepared statements** obrigatórios (`better-sqlite3` usa `?` posicionais — sem concatenação)
* CORS configurado com lista de origens permitidas
* `helmet` para headers de segurança (opcional no MVP)
* `api/db/` listado no `.gitignore` — banco local nunca versionado

---

## 4. Especificações Visuais do Front-end

### 4.1 Stack

* **HTML5 semântico** (`<header>`, `<main>`, `<section>`, `<form>`)
* **Tailwind CSS via CDN** — classes utilitárias para responsividade rápida
* **JavaScript nativo** — Fetch API, cálculo tributário, validação e feedback sem refresh

### 4.2 Seções da Landing Page

1. **Navbar** — fixa no topo, logo + CTA "Calcular agora"
2. **Hero** — headline forte, subheadline, apresentação do AgroTax, botão CTA âncora para a calculadora
3. **Benefícios** — 3 cards com ícones (Mobile-First: empilhados, Desktop: grid 3 col)
4. **Calculadora Tributária** — campos para produto, valor da operação, tipo de operação e regime tributário, com validação inline, botão com loading spinner e apresentação dos tributos calculados
5. **Guia Fiscal** — explicações sobre ICMS, IPI, PIS/COFINS, Funrural, SENAR, isenções e benefícios fiscais
6. **Sobre** — informações sobre o AgroTax e a base legal utilizada
7. **Footer** — links, direitos reservados

### 4.3 Comportamento de Submissão

1. Usuário preenche → clique no botão
2. Botão desabilita + exibe spinner
3. Fetch API envia `POST` para `http://localhost:3000/api/calculos`
4. Em caso de **sucesso**: exibe resultado dos tributos, valor líquido estimado e carga tributária percentual
5. Em caso de **erro**: exibe toast vermelho com a mensagem retornada pela API

---

## 5. Regras de Otimização de Tokens (Codificação Futura)

| Princípio              | Aplicação                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Comentários em PT-BR   | Toda função, variável e bloco relevante deve ter comentário descritivo em português brasileiro |
| Arrow functions curtas | Preferir `(x) => x` a `function(x) { return x }`                                               |
| Destructuring          | `const { produto, valor_operacao, tipo_operacao, regime_tributario } = req.body`               |
| Template strings       | `` `${base}/calculos` `` em vez de concatenação                                                |
| If ternário            | `status === 200 ? sucesso() : erro()`                                                          |
| Minificação de CSS     | Manter classes Tailwind no HTML, CSS customizado mínimo                                        |
| Reuso de fetch         | Função genérica `api(método, corpo)` para todas as chamadas                                    |
| SQL com placeholder    | `?` posicional (`better-sqlite3`) — nunca template literals                                    |

---

## 6. Fluxo de Desenvolvimento (Próximos Passos)

1. ✅ **Fase 1 (atual):** Planejamento e arquitetura — *documento salvo*
2. ⏳ **Fase 2:** Codificação do backend (`/api`) — package.json, conexaoBanco.js (SQLite), iniciarBanco.js, rotas, controlador, validadores
3. ⏳ **Fase 3:** Codificação do frontend (`/frontend`) — HTML, Tailwind, JS com cálculo tributário + Fetch
4. ⏳ **Fase 4:** Teste integrado e ajustes finos

---

*Documento gerado em 29/07/2026 — Pronto para codificação após aprovação.*
