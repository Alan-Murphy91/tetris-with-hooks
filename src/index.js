import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

import Tetris from './components/Tetris/Tetris';

import 'normalize.css/normalize.css';

const game = <Tetris />

ReactDOM.render(
	game, 
	document.getElementById('app')
);
