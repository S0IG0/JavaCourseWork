import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {backend} from "./components/config/BackendUtils";
import Store from "./components/store/store";

interface State {
    store: Store;
}

const store = new Store();

export const Context = createContext<State>({
    store,
});

const client = new ApolloClient({
    uri: backend.graphql(),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Context.Provider value={{store}}>
        <React.StrictMode>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <App/>
                </ApolloProvider>
            </BrowserRouter>
        </React.StrictMode>
    </Context.Provider>
);

reportWebVitals();
