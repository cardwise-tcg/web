import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import Root from './pages/Root';
import Games from './pages/Games';
import About from './pages/About';
import Error from './pages/Error';
import SelectedGameProvider from "./contexts/SelectedGameContext";
import Setup from "./pages/Setup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/games",
                element: <Games/>
            },
            {
                path: "/setup",
                element: <Setup/>
            },
            {
                path: "/about",
                element: <About/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SelectedGameProvider>
            <RouterProvider router={router}/>
        </SelectedGameProvider>
    </React.StrictMode>,
)
