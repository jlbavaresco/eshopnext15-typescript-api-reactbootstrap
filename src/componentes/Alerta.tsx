'use client'
import { useState, useEffect, FunctionComponent } from "react";
import Alert from 'react-bootstrap/Alert';
import Alerta from "@/bd/entitites/Alerta";

interface AlertaProps {
    alerta : Alerta
}

const AlertaMessage : FunctionComponent<AlertaProps> = ({ alerta }) => {

    const [exibir, setExibir] = useState(false);

    useEffect(() => {
        setExibir(true);
        setTimeout(() => {
            setExibir(false);
        }, 2000);
    }, [alerta]);

    var variant = '';
    if (alerta.status === 'error') {
        variant = 'danger'
    } else {
        variant = 'primary'
    }

    return (
        <div>
            {(alerta.message.length > 0 && exibir) &&
                <Alert variant={variant}>
                    {alerta.message}
                </Alert>
            }
        </div>
    )

}

export default AlertaMessage;