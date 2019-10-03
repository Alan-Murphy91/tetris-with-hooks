import React, { useState } from 'react';

import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';

import Stage from '../Stage/Stage';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';

import { createStage } from '../../gameHelpers';

import { StyledTetris, StyledTetrisWrapper } from '../Tetris/StyledTetris';

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(null);

	const [player, updatePlayerPos, resetPlayer] = usePlayer();
	const [stage, setStage] = useStage(player)

	console.log('render');

	const movePlayer = dir => {
		updatePlayerPos({x: dir, y: 0});
	}

	const startGame = () => {
		//reset
		setStage(createStage());
		resetPlayer();
	}

	const drop = () => {
		updatePlayerPos({x: 0, y: 1, collided: false})
	}

	const dropPlayer = () => {
		drop();
	}

	const move = ({ keyCode }) => {
		console.log(keyCode);
		if (!gameOver) {
			if (keyCode === 37) {
				movePlayer(-1);
			} else if (keyCode === 39) {
				movePlayer(1);
			} else if (keyCode === 40) {
				dropPlayer();
			}
		}
	}

	return (
		<StyledTetrisWrapper
			onKeyDown={e => move(e)}
			role="button"
			tabIndex="0"
		>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
				{gameOver ? (
						<Display gameOver={gameOver} text="Game Over" />
					) : (
						<>
							<Display text="Score" />
							<Display text="Rows" />
							<Display text="Level" />
						</>
					)}
					<StartButton callback={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;
