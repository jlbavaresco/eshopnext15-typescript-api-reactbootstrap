'use client'
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

export default function Sobre() {

    return (
        <div style={{ padding: '20px' }}>
            <Container >
                <div className="row justify-content-center ">
                    <Col sm="3" >
                        <Card className='mb-3 text-center'>
                            <Card.Header>Sobre o sistema....</Card.Header>
                            <Card.Body >
                                <Card.Title>IFSUL - 2024</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">NextJS 14</Card.Subtitle>
                                <Card.Text>
                                    React BootStrap + API
                                </Card.Text>
                                <Card.Text>
                                    Projeto FullStack com API integrada no projeto do FrontEnd
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">Contato: jorgebavaresco@ifsul.edu.br</Card.Footer>
                        </Card>
                    </Col>
                </div>
            </Container>
        </div>
    )
}