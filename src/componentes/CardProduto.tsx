'use client'
import Produto from '@/bd/entitites/Produto';
import Card from 'react-bootstrap/Card';
import { FunctionComponent } from "react";
import { Col } from 'react-bootstrap';

interface ProdutoProps {
    produto: Produto
}

const CardProduto: FunctionComponent<ProdutoProps> = ({ produto }) => {
    return (
        <>
            <Col sm="3">
                <Card className='mb-3 text-center'>
                    <Card.Header>{produto.nome}</Card.Header>
                    <Card.Body >
                        <Card.Title>{produto.nome}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{produto.categoria_nome}</Card.Subtitle>
                        <Card.Text>
                            {produto.descricao}
                        </Card.Text>
                        <Card.Text>
                            Preço: {produto.valor}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">Estoque: {produto.quantidade_estoque}</Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default CardProduto;