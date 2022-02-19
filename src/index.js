// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Stores MobX
import AmbreStore from './stores/ambreStore';
import { Provider } from 'mobx-react';
const ambreStore = new AmbreStore();
const stores = { ambreStore };

// ReactDOM
ReactDOM.render(<Provider { ...stores }><App/></Provider>, document.getElementById('root'));