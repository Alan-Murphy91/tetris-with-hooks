import React from 'react';

import Stage from '../Stage/Stage';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';

import { createStage } from '../../gameHelpers';

const Tetris = () => {
	return (
		<div>
			<Stage stage={createStage()} />
			<aside>
				<Display text="Score" />
				<Display text="Rows" />
				<Display text="Level" />
			</aside>
			<StartButton />
		</div>
	);
};

export default Tetris;
