const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_REMETENTE,
    pass: process.env.EMAIL_SENHA_APP
  }
})

async function enviarEmailLead(dados) {
  await transporter.sendMail({
    from: process.env.EMAIL_REMETENTE,
    to: process.env.EMAIL_DESTINO,
    subject: 'Nova mensagem recebida no AgroTax',

    text: `
Nova mensagem recebida pelo formulário do AgroTax.

Nome: ${dados.nome_completo}

E-mail: ${dados.email}

Telefone: ${dados.telefone_whatsapp}

Mensagem:
${dados.mensagem || '(Sem mensagem)'}
    `
  })
}

module.exports = {
  enviarEmailLead
}