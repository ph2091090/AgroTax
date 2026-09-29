const banco = require('./src/config/conexaoBanco')

// Cria as tabelas de leads, produtos e simulacoes
// e os indices se nao existirem
banco.exec(`
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

  CREATE INDEX IF NOT EXISTS idx_leads_email
  ON leads(email);

  CREATE INDEX IF NOT EXISTS idx_leads_status
  ON leads(status_atendimento);

  CREATE TABLE IF NOT EXISTS produtos (
    id                          INTEGER PRIMARY KEY AUTOINCREMENT,
    nome                        TEXT NOT NULL,
    categoria                   TEXT NOT NULL,
    aliquota_icms               REAL DEFAULT 0,
    aliquota_ipi                REAL DEFAULT 0,
    aliquota_pis                REAL DEFAULT 0,
    aliquota_cofins             REAL DEFAULT 0,
    aliquota_funrural           REAL DEFAULT 0,
    aliquota_senar              REAL DEFAULT 0,
    isencao_icms                INTEGER DEFAULT 0,
    isencao_pis_cofins          INTEGER DEFAULT 0
  );

  CREATE INDEX IF NOT EXISTS idx_produtos_nome
  ON produtos(nome);

  CREATE TABLE IF NOT EXISTS simulacoes (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id          INTEGER NOT NULL,
    valor_operacao      REAL NOT NULL,
    regime_tributario   TEXT NOT NULL,
    tipo_operacao       TEXT NOT NULL,
    icms                REAL DEFAULT 0,
    ipi                 REAL DEFAULT 0,
    pis                 REAL DEFAULT 0,
    cofins              REAL DEFAULT 0,
    funrural            REAL DEFAULT 0,
    senar               REAL DEFAULT 0,
    total_tributos      REAL DEFAULT 0,
    valor_liquido       REAL DEFAULT 0,
    carga_tributaria    REAL DEFAULT 0,
    data                TEXT DEFAULT (datetime('now','localtime')),

    FOREIGN KEY (produto_id)
    REFERENCES produtos(id)
  );

  CREATE INDEX IF NOT EXISTS idx_simulacoes_produto
  ON simulacoes(produto_id);

  CREATE INDEX IF NOT EXISTS idx_simulacoes_data
  ON simulacoes(data);
`)

banco.prepare(`
  INSERT OR IGNORE INTO produtos (
    id,
    nome,
    categoria,
    aliquota_icms,
    aliquota_ipi,
    aliquota_pis,
    aliquota_cofins,
    aliquota_funrural,
    aliquota_senar,
    isencao_icms,
    isencao_pis_cofins
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  1,
  'Produto de teste',
  'Teste',
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
)

console.log('Tabelas do AgroTax criadas/verificadas com sucesso.')