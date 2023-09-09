import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './navigation/Routes';

const App = () => {
    return (
        <Routes />
    );
};

export default App;
