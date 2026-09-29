function calcularTributos(valor, produto) {
    const icms = valor * (produto.aliquota_icms / 100);
    const ipi = valor * (produto.aliquota_ipi / 100);
    const pis = valor * (produto.aliquota_pis / 100);
    const cofins = valor * (produto.aliquota_cofins / 100);
    const funrural = valor * (produto.aliquota_funrural / 100);
    const senar = valor * (produto.aliquota_senar / 100);

    const totalTributos =
        icms +
        ipi +
        pis +
        cofins +
        funrural +
        senar;

    const valorLiquido = valor - totalTributos;

    const cargaTributaria =
        valor > 0
            ? (totalTributos / valor) * 100
            : 0;

    return {
        icms,
        ipi,
        pis,
        cofins,
        funrural,
        senar,
        totalTributos,
        valorLiquido,
        cargaTributaria
    };
}

module.exports = {
    calcularTributos
};