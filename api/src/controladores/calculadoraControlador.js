const db = require('../config/conexaoBanco');

const {
    calcularTributos
} = require('../utilitarios/calculadoraTributaria');

function listarProdutos(req, res) {
    const produtos = db.prepare(`
        SELECT *
        FROM produtos
        ORDER BY nome
    `).all();

    res.json(produtos);
}

function calcular(req, res) {
    const {
        produto_id,
        valor_operacao,
        regime_tributario,
        tipo_operacao
    } = req.body;

    if (!produto_id || !valor_operacao) {
        return res.status(400).json({
            erro: 'Produto e valor da operação são obrigatórios.'
        });
    }

    const produto = db.prepare(`
        SELECT *
        FROM produtos
        WHERE id = ?
    `).get(produto_id);

    if (!produto) {
        return res.status(404).json({
            erro: 'Produto não encontrado.'
        });
    }

    const resultado = calcularTributos(
        valor_operacao,
        produto
    );

    db.prepare(`
        INSERT INTO simulacoes (
            produto_id,
            valor_operacao,
            regime_tributario,
            tipo_operacao,
            icms,
            ipi,
            pis,
            cofins,
            funrural,
            senar,
            total_tributos,
            valor_liquido,
            carga_tributaria
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        produto_id,
        valor_operacao,
        regime_tributario,
        tipo_operacao,
        resultado.icms,
        resultado.ipi,
        resultado.pis,
        resultado.cofins,
        resultado.funrural,
        resultado.senar,
        resultado.totalTributos,
        resultado.valorLiquido,
        resultado.cargaTributaria
    );

    res.json({
        produto: produto.nome,
        valor_operacao,
        regime_tributario,
        tipo_operacao,
        ...resultado
    });
}

module.exports = {
    listarProdutos,
    calcular
};