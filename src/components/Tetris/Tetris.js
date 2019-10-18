import React, { useState, useEffect } from 'react';

import { useInterval } from '../../hooks/useInterval';
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';
import { useGameStatus } from '../../hooks/useGameStatus';

import TetrisResponsiveButtons from './TetrisResponsiveButtons';
import Stage from '../Stage/Stage';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';

import { createStage, checkCollision, snapTetromino, adjustGhostForEmptyTetrominoArray } from '../../gameHelpers';

import { StyledTetris, StyledTetrisWrapper, StyledAside } from '../Tetris/StyledTetris';

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(null);
	const [canDrop, setCanDrop] = useState(true);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared, merges, setMerges] = useStage(player, resetPlayer);
	const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
	
	const startGame = () => {
		//reset
		setStage(createStage());
		setDropTime(800);
		resetPlayer();
		setGameOver(false);
		setScore(0);
		setRows(0);
		setLevel(0);
		setMerges({});
	}

	const movePlayer = dir => {
		if (!checkCollision(player, stage, { x: dir, y: 0})) {
			updatePlayerPos({x: dir, y: 0});
		}
	}

	const drop = () => {
		if (rows > (level + 1) * 10) {
			setLevel(prev => prev + 1);
			setDropTime(800 / (level + 1) + 200);
		}
		if (!checkCollision(player, stage, { x: 0, y: 1})) {
			updatePlayerPos({x: 0, y: 1, collided: false})
		} else {
			if (player.pos.y < 1) {
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({x: 0, y: 0, collided: true})
		}
	}

	const keyUp = ({ keyCode }) => {
		if(!gameOver) {
			if (keyCode === 40) {
				setDropTime(800 / (level + 1) + 200);
			}
		}
	}

	const dropPlayer = () => {
		setDropTime(null);
		drop();
	}

	const move = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 37) {
				movePlayer(-1);
			} else if (keyCode === 39) {
				movePlayer(1);
			} else if (keyCode === 40) {
				dropPlayer();
			} else if (keyCode === 38) {
				playerRotate(stage, 1);
			} else if (keyCode === 32) {
				if (canDrop) {
					updatePlayerPos({x: 0, y: snapTetromino(stage, player, merges), collided: true});
				}
				setCanDrop(false);
			}
		}
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setCanDrop(true);
		}, dropTime);
		return () => clearTimeout(timer);
	}, [canDrop])

	useInterval(() => {
		drop();
	}, dropTime);

	return (
		<StyledTetrisWrapper
			onKeyDown={e => move(e)}
			onKeyUp={keyUp}
			role="button"
			tabIndex="0"
		>
			<TetrisResponsiveButtons 
				player={player}
				stage={stage}
				dir={-1} 
				movePlayer={movePlayer} 
				playerRotate={playerRotate}
				updatePlayerPos={updatePlayerPos}
				merges={merges}
			/>
			<StyledTetris>
				<Stage stage={stage} />
				<StyledAside>
				{gameOver ? (
						<Display gameOver={gameOver} text="Game Over" />
					) : (
						<>
							<Display text={`Score: ${score}`} />
							<Display text={`Rows: ${rows}`} />
							<Display text={`Level: ${level}`} />
						</>
					)}
					<StartButton callback={startGame} />
				</StyledAside>
			</StyledTetris>
			<TetrisResponsiveButtons 
				player={player}
				stage={stage}
				dir={1} 
				movePlayer={movePlayer} 
				playerRotate={playerRotate}
				updatePlayerPos={updatePlayerPos}
				merges={merges}
			/>		
			</StyledTetrisWrapper>
	);
};

export default Tetris;
