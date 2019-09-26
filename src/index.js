import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './redux/store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// const store = configureStore();

// const App = (
// 	<Provider store={store}>
// 		<AppRouter />
// 	</Provider>
// );

const App = <AppRouter />

ReactDOM.render(
	App, 
	document.getElementById('app')
);
