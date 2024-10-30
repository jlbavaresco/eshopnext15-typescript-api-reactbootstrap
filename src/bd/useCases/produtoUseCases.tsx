import Produto from "../entitites/Produto";
const { pool } = require('../config');

const getProdutosDB = async () => {
    try {
        const { rows } = await pool.query(`select p.codigo as codigo, 
            p.nome as nome, p.descricao as descricao, 
            p.quantidade_estoque as quantidade_estoque, 
            p.ativo as ativo, p.valor as valor, 
            to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro, 
            p.categoria as categoria, c.nome as categoria_nome
            from produtos p
            join categorias c on p.categoria = c.codigo
            order by p.codigo`);
        return rows.map((produto: Produto) =>
            new Produto(produto.codigo, produto.nome, produto.descricao,
                produto.quantidade_estoque, produto.ativo, produto.valor,
                produto.data_cadastro, produto.categoria, produto.categoria_nome));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const deleteProdutoDB = async (codigo: number) => {
    try {
        const results = await pool.query(`DELETE FROM produtos
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return `Produto de código ${codigo} removida com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover o produto: " + err;
    }
}

const addProdutoDB = async (objeto: Produto) => {
    try {
        const { nome, descricao, quantidade_estoque, ativo, valor,
            data_cadastro, categoria } = objeto;
        const results = await pool.query(`INSERT INTO produtos (nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        returning codigo, nome, descricao, quantidade_estoque, ativo, valor, to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro, categoria`,
            [nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria]);
        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque,
            produto.ativo, produto.valor, produto.data_cadastro, produto.categoria, "");
    } catch (err) {
        throw "Erro ao inserir o produto: " + err;
    }
}

const updateProdutoDB = async (objeto: Produto) => {
    try {
        const { codigo, nome, descricao, quantidade_estoque, ativo, valor,
            data_cadastro, categoria } = objeto;
        const results = await pool.query(`UPDATE produtos set nome = $2 , descricao = $3, quantidade_estoque = $4, 
                ativo = $5, valor = $6, data_cadastro = $7, categoria = $8 where codigo = $1 
                returning codigo, nome, descricao, quantidade_estoque, ativo, valor, to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro, categoria`,
            [codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque,
            produto.ativo, produto.valor, produto.data_cadastro, produto.categoria, "");
    } catch (err) {
        throw "Erro ao alterar a categoria: " + err;
    }
}

const getProdutoPorCodigoDB = async (codigo: number) => {
    try {
        const results = await pool.query(`select p.codigo as codigo, 
            p.nome as nome, p.descricao as descricao, 
            p.quantidade_estoque as quantidade_estoque, 
            p.ativo as ativo, p.valor as valor, 
            to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro, 
            p.categoria as categoria, c.nome as categoria_nome
            from produtos p
            join categorias c on p.categoria = c.codigo
            WHERE p.codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const produto: Produto = results.rows[0];
            return new Produto(produto.codigo, produto.nome, produto.descricao,
                produto.quantidade_estoque, produto.ativo, produto.valor,
                produto.data_cadastro, produto.categoria, produto.categoria_nome);
        }
    } catch (err) {
        throw "Erro ao recuperar a categoria: " + err;
    }
}

export {
    getProdutosDB, addProdutoDB, updateProdutoDB, deleteProdutoDB, getProdutoPorCodigoDB
}