import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import allReducers from './reducers';
import App from './components/App';
import { loadState } from '../localStorage';
import { saveState } from '../localStorage';
import  throttle  from 'lodash/throttle';

const persistedState = loadState();

const logger = createLogger();

const store = createStore(
    allReducers,
    persistedState
);

// Local storage for states, Even though i don't want to save all the states of App in storage but hea I have done the same 
store.subscribe(throttle(()=> {
    saveState(store.getState())
},1000));

ReactDOM.render(
    <MuiThemeProvider>
    <Provider store={store}>
        <App />
    </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
