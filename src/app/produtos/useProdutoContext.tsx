import { useContext } from "react";
import ProdutoContext from "./ProdutoContext";

export const useProdutoContext = () => {
    const context = useContext(ProdutoContext);
    if (!context) {
        throw new Error("Erro ao carregar o ProdutoContext");
    }
    return context;
};