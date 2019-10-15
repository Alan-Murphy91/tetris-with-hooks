import { useState, useEffect } from 'react';

import { createStage, checkCollision, ghostTetrominoIsHigherThanMerge } from '../gameHelpers';


export const useStage = (player, resetPlayer) => {
	const [stage, setStage] = useState(createStage());
	const [rowsCleared, setRowsCleared] = useState(0);

	const mergeCoords = {};

	const buildTetromino = (tetromino, stage, coordY, coordX, ghostY = 0) =>
		tetromino.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value !== 0) {
					stage[coordY + y + ghostY][coordX + x] = [
						value,
						`${player.collided ? 'merged' : 'clear'}`,
						ghostY > 0 ? 'ghost' : '',
					];
				}
			});
		});

	const buildStage = template =>
		template.map((row, y) =>
			row.map((cell, x) => {
				if (cell[1] === 'clear') {
					return [0, 'clear'];
				} else {
					if (Object.prototype.hasOwnProperty.call(mergeCoords, x.toString())) {
						mergeCoords[x.toString()] = [...mergeCoords[x.toString()], y];
					} else {
						mergeCoords[x.toString()] = [y];
					}
					return cell;
				}
			})
		);

	const sweepRows = newStage =>
		newStage.reduce((acc, row) => {
			if (row.findIndex(cell => cell[0] === 0) === -1) {
				setRowsCleared(prev => prev + 1);
				acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
				return acc;
			}
			acc.push(row);
			return acc;
	}, []);

	const updateStage = prevStage => {
		const newStage = buildStage(prevStage);
		
		buildTetromino(
			player.tetromino, newStage, player.pos.y, player.pos.x
		);

		for (let i = newStage.length - player.tetromino.length; i > player.pos.y; i -= 1) {
			const clonedPlayer = JSON.parse(JSON.stringify(player));
			clonedPlayer.pos.y = 0;
			
			if (!checkCollision(clonedPlayer, newStage, {x: 0, y: i })) {
				if (ghostTetrominoIsHigherThanMerge(clonedPlayer, mergeCoords, i)) {
					if((i + clonedPlayer.pos.y - player.pos.y) <= 2) {
						break;
					}
					buildTetromino(
						player.tetromino, newStage, clonedPlayer.pos.y, player.pos.x, i
					);
					break;
				}
			}
		}

		if (player.collided) {
			resetPlayer();
			return sweepRows(newStage);
		}
		return newStage;
	};

	useEffect(() => {
		setRowsCleared(0);
		setStage(prev => updateStage(prev))
	}, [player]);

	return [stage, setStage, rowsCleared];
};
