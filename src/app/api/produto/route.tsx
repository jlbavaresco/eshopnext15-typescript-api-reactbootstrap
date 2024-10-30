import { NextRequest, NextResponse } from "next/server";
import { getProdutosDB, addProdutoDB, updateProdutoDB } from "@/bd/useCases/produtoUseCases";
import Produto from "@/bd/entitites/Produto";

//req is short for request
export async function GET(request: NextRequest) {
    try {
        const dados: Produto[] = await getProdutosDB();
        return NextResponse.json(dados, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { status: 'Error', message: "Erro: " + err },
            { status: 400 }
        );
    }
}

export async function POST(request: NextRequest) {

    const objeto: Produto = await request.json();
    try {
        const produtoCriado = await addProdutoDB(objeto);
        return NextResponse.json({
            status: "success", message: "Produto criado",
            objeto: produtoCriado
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { status: 'Error', message: "Erro: " + err },
            { status: 400 }
        );
    }
}

export async function PUT(request: NextRequest) {

    const objeto: Produto = await request.json();
    try {
        const produtoAtualizado = await updateProdutoDB(objeto);
        return NextResponse.json({
            status: "success", message: "Produto atualizado",
            objeto: produtoAtualizado
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { status: 'Error', message: "Erro: " + err },
            { status: 400 }
        );
    }
}