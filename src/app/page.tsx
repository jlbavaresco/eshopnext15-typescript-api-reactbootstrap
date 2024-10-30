import Produto from "@/bd/entitites/Produto";
import { getProdutosAPI } from "@/servicos/ProdutoServico";
import CardProduto from "@/componentes/CardProduto";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export const dynamic = 'force-dynamic';

export default async function Home() {

  const produtos = await getProdutosAPI();

  return (
    <div style={{ padding: '20px' }}>      
      <Container>
         <Row>
          {
            produtos.map((produto: Produto) => (             
                <CardProduto produto={produto} key={produto.codigo}/>           
            ))
          }
        </Row>
      </Container>
    </div>
  );
}
