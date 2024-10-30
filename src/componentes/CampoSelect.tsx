import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FunctionComponent, ReactNode } from 'react';

interface CampoSelectProps {
    value : any;
    name : string;
    label : string;
    requerido? : boolean;
    id : string;
    onchange : any;
    msgvalido? : string;
    msginvalido? : string;
    maxCaracteres? : number;
    children? : ReactNode;
}

const CampoSelect : FunctionComponent<CampoSelectProps> =(props) => {
    return (
        <FloatingLabel controlId={props.id} label={props.label} className="mb-3">
            <Form.Select
                value={props.value} required={props.requerido}
                name={props.name} onChange={props.onchange}>
                <option disabled selected value="">({props.msginvalido})</option>
                {props.children}
            </Form.Select>
            <Form.Control.Feedback>{props.msgvalido}</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                {props.msginvalido}
            </Form.Control.Feedback>
        </FloatingLabel>
    )
}

export default CampoSelect;