'use client';
import { useEffect } from 'react';

const Error = ({ error, reset }) => {

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div>
            <h2>Algo deu errado!</h2>
            <button onClick={
                () => reset()
            }
            >
                Tentar novamente
            </button>
        </div>
    );
}

export default Error;
