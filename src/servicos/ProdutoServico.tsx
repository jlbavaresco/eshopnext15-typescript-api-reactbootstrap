import Produto from "@/bd/entitites/Produto";

export const getProdutosAPI = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const getProdutoPorCodigoAPI = async (codigo: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deleteProdutoPorCodigoAPI = async (codigo: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraProdutoAPI = async (objeto : Produto, metodo : string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}