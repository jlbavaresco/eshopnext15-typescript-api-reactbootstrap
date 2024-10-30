import { NextRequest, NextResponse } from "next/server";
import { getProdutoPorCodigoDB, deleteProdutoDB } from "@/bd/useCases/produtoUseCases";

type FindByCodigo = {
	codigo: string;
};

export async function GET(request: NextRequest, context: { params: Promise<FindByCodigo> }) {
    try {
        const { codigo  } = await context.params;
        let produto = await getProdutoPorCodigoDB(Number(codigo));
        return NextResponse.json(produto,{ status: 200 });
    } catch (err) {
        return NextResponse.json(
            { status: 'Error', message: "Erro: " + err },
            { status: 404 }
        );
    }
}

export async function DELETE(request: NextRequest, context: { params: Promise<FindByCodigo> }) {
    try {
        const { codigo } = await context.params;
        let resultado = await deleteProdutoDB(Number(codigo));
        return NextResponse.json({status : "success", message : resultado},{ status: 200 });
    } catch (err) {
        return NextResponse.json(
            { status: 'Error', message: "Erro: " + err },
            { status: 404 }
        );
    }
}