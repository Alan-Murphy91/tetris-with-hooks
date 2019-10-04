import React, { useState } from 'react';

import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';

import Stage from '../Stage/Stage';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';

import { createStage, checkCollision } from '../../gameHelpers';

import { StyledTetris, StyledTetrisWrapper } from '../Tetris/StyledTetris';

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(null);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage] = useStage(player, resetPlayer)

	const movePlayer = dir => {
		if (!checkCollision(player, stage, { x: dir, y: 0})) {
			updatePlayerPos({x: dir, y: 0});
		}
	}

	const startGame = () => {
		//reset
		setStage(createStage());
		resetPlayer();
		setGameOver(false);
	}

	const drop = () => {
		if (!checkCollision(player, stage, { x: 0, y: 1})) {
			updatePlayerPos({x: 0, y: 1, collided: false})
		} else {
			if (player.pos.y < 1) {
				console.log('GAME OVER');
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({x: 0, y: 0, collided: true})
		}
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
			} else if (keyCode === 38) {
				playerRotate(stage, 1);
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
