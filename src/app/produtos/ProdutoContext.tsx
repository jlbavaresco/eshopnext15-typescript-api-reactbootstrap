import Alerta from '@/bd/entitites/Alerta';
import Categoria from '@/bd/entitites/Categoria';
import Produto from '@/bd/entitites/Produto';
import React, { createContext } from 'react';

export interface ProdutoContextType {
    listaObjetos: Produto[];
    alerta: Alerta;
    remover: (codigo : number) => void;
    objeto: Produto;
    editarObjeto: (codigo : number) => void;
    acaoCadastrar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    novoObjeto: () => void;
    exibirForm: boolean;
    setExibirForm: React.Dispatch<React.SetStateAction<boolean>>;
    listaCategorias: Categoria[]
}

const ProdutoContext = createContext<ProdutoContextType | undefined>(undefined);

export default ProdutoContext;
