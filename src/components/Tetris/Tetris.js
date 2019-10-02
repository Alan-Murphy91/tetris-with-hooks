import React from 'react';

import Stage from '../Stage/Stage';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';

import { StyledTetris, StyledTetrisWrapper } from '../Tetris/StyledTetris';
import { createStage } from '../../gameHelpers';

const Tetris = () => {
	return (
		<StyledTetrisWrapper>
			<StyledTetris>
				<Stage stage={createStage()} />
				<aside>
					<Display text="Score" />
					<Display text="Rows" />
					<Display text="Level" />
					<StartButton />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;
