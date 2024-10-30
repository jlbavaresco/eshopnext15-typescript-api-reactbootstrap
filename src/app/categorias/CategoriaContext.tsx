import Alerta from '@/bd/entitites/Alerta';
import Categoria from '@/bd/entitites/Categoria';
import React, { createContext } from 'react';

export interface CategoriaContextType {
    listaObjetos: Categoria[];
    alerta: Alerta;
    remover: (codigo : number) => void;
    objeto: Categoria;
    editarObjeto: (codigo : number) => void;
    acaoCadastrar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    novoObjeto: () => void;
    exibirForm: boolean;
    setExibirForm: React.Dispatch<React.SetStateAction<boolean>>;    
}

const CategoriaContext = createContext<CategoriaContextType | undefined>(undefined);

export default CategoriaContext;
