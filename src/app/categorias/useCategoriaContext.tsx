import { useContext } from "react";
import CategoriaContext from "./CategoriaContext";

export const useCategoriaContext = () => {
    const context = useContext(CategoriaContext);
    if (!context) {
        throw new Error("Erro ao carregar o CategoriaContext");
    }
    return context;
};