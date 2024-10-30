'use client'
import React, { useState, useEffect, useContext } from 'react';
import ProdutoContext from './ProdutoContext';
import { getCategoriasAPI } from '@/servicos/CategoriaServico';
import { getProdutosAPI, getProdutoPorCodigoAPI, deleteProdutoPorCodigoAPI, cadastraProdutoAPI } from '@/servicos/ProdutoServico'
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '@/componentes/Carregando';
import Alerta from '@/bd/entitites/Alerta';
import Produto from '@/bd/entitites/Produto';
import Categoria from '@/bd/entitites/Categoria';

function CrudProduto() {

    const [alerta, setAlerta] = useState<Alerta>({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState<Produto[]>([]);
    const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
    const [carregando, setCarregando] = useState(true);

    const recuperaProdutos = async () => {
        setCarregando(true);
        setListaObjetos(await getProdutosAPI());
        setCarregando(false);
    }

    const recuperaCategorias = async () => {
        setListaCategorias(await getCategoriasAPI());
    }

    const remover = async (codigo: number) => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteProdutoPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaProdutos();
        }
    }

    useEffect(() => {
        recuperaProdutos();
        recuperaCategorias();
    }, []);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState<Produto>({
        codigo: 0,
        nome: "",
        descricao: "",
        quantidade_estoque: null,
        valor: null,
        ativo: true,
        data_cadastro: new Date().toISOString().slice(0, 10),
        categoria: null,
        categoria_nome: ""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            descricao: "",
            quantidade_estoque: null,
            valor: null,
            ativo: null,
            data_cadastro: new Date().toISOString().slice(0, 10),
            categoria: null,
            categoria_nome: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async (codigo: number) => {
        setObjeto(await getProdutoPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraProdutoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaProdutos();
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    return (
        <ProdutoContext.Provider value={
            {
                listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm, listaCategorias
            }
        }>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </ProdutoContext.Provider>
    );
}

export default CrudProduto;