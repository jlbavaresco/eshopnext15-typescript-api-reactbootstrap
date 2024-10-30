'use client'
import React, { useState, useEffect } from 'react';
import CategoriaContext from './CategoriaContext';
import { getCategoriasAPI, getCategoriaPorCodigoAPI, deleteCategoriaPorCodigoAPI, cadastraCategoriaAPI } from '@/servicos/CategoriaServico';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '@/componentes/Carregando';
import Alerta from '@/bd/entitites/Alerta';
import Categoria from '@/bd/entitites/Categoria';

function CrudProduto() {

    const [alerta, setAlerta] = useState<Alerta>({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState<Categoria[]>([]);
    const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
    const [carregando, setCarregando] = useState(true);

    const recuperaCategorias = async () => {
        setCarregando(true);
        setListaObjetos(await getCategoriasAPI());
        setCarregando(false);
    }

    const remover = async (codigo: number) => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteCategoriaPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaCategorias();
        }
    }

    useEffect(() => {        
        recuperaCategorias();
    }, []);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState<Categoria>({
        codigo: 0,
        nome: ""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",           
        });
        setExibirForm(true);
    }

    const editarObjeto = async (codigo: number) => {
        setObjeto(await getCategoriaPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCategoriaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaCategorias();
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    return (
        <CategoriaContext.Provider value={
            {
                listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm
            }
        }>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </CategoriaContext.Provider>
    );
}

export default CrudProduto;