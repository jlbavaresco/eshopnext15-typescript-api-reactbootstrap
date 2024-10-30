import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FunctionComponent } from 'react';

interface CampoEntradaTextAreaProps {
    value : any;
    name : string;
    label : string
    tipo : string;
    requerido? : boolean;
    id : string;
    onchange : (e: React.ChangeEvent<HTMLInputElement>) => void;
    msgvalido? : string;
    msginvalido? : string;
    readonly : boolean;
    maxCaracteres? : number
}

const CampoEntradaTextArea : FunctionComponent<CampoEntradaTextAreaProps> = ({ value, name, label,
    tipo, requerido, id, onchange,
    msgvalido, msginvalido, readonly, maxCaracteres }) => {
    return (
        <FloatingLabel controlId={id} label={label} className="mb-3">
            <Form.Control type={tipo} required={requerido} name={name}
                value={value}
                onChange={onchange} readOnly={readonly} maxLength={maxCaracteres}
                as="textarea" style={{ height: '100px' }} />
            <Form.Control.Feedback>{msgvalido}</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                {msginvalido}
            </Form.Control.Feedback>
        </FloatingLabel>
    )
}

export default CampoEntradaTextArea;