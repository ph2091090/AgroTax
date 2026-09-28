const banco = require('../config/conexaoBanco')

const { validarLead } = require('../utilitarios/validadores')
const { enviarEmailLead } = require('../utilitarios/email')

// Cadastra um novo lead no banco de dados e envia a mensagem por e-mail

async function cadastrarLead(req, res) {

  const { valido, erros, dados } = validarLead(req.body)

  if (!valido) {
    return res.status(422).json({
      sucesso: false,
      mensagem: 'Dados inválidos.',
      erros
    })
  }

  const inserir = banco.prepare(
    'INSERT INTO leads (nome_completo, email, telefone_whatsapp, mensagem) VALUES (?, ?, ?, ?)'
  )

  inserir.run(
    dados.nome_completo,
    dados.email,
    dados.telefone_whatsapp,
    dados.mensagem
  )

  try {

    await enviarEmailLead(dados)

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Os dados foram enviados com sucesso e a mensagem foi encaminhada por e-mail!'
    })

  } catch (erro) {

    console.error('Erro ao enviar e-mail:', erro)

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Os dados foram salvos, mas não foi possível enviar o e-mail.'
    })

  }
}

// Lista leads cadastrados com paginação

function listarLeads(req, res) {

  const pagina = parseInt(req.query.pagina) || 1

  const limite = parseInt(req.query.limite) || 20

  const offset = (pagina - 1) * limite

  const total = banco
    .prepare('SELECT COUNT(*) AS total FROM leads')
    .get()

  const leads = banco
    .prepare(
      'SELECT * FROM leads ORDER BY data_cadastro DESC LIMIT ? OFFSET ?'
    )
    .all(limite, offset)

  res.json({
    sucesso: true,
    dados: leads,
    total: total.total,
    pagina,
    limite
  })

}

module.exports = {
  cadastrarLead,
  listarLeads
}