import { FunctionComponent, ReactNode, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface DialogoProps {
    acaoCadastrar : (e: React.ChangeEvent<HTMLInputElement>) => void;
    exibirForm: boolean;
    setExibirForm: React.Dispatch<React.SetStateAction<boolean>>;
    titulo : string;
    id : string;
    idform : string;
    children? : ReactNode;
}

const Dialogo : FunctionComponent<DialogoProps> =(props) => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event : any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        if (form.checkValidity() === true) {
            props.acaoCadastrar(event);
        }
    };

    return (
        <Modal show={props.exibirForm} onHide={() => props.setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{props.titulo}</Modal.Title>
            </Modal.Header>
            <Form id={props.id} onSubmit={handleSubmit} noValidate validated={validated}>
                <Modal.Body>
                    <Container>
                        <Row>
                            {props.children}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setExibirForm(false)}>
                        Fechar
                    </Button>
                    <Button variant="success" type="submit">
                        Salvar  <i className="bi bi-save"></i>
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default Dialogo;