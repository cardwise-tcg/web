import { useRouteError } from 'react-router-dom';
import './index.css';

const Error = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1 className="h1">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export default Error;
