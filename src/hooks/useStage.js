import { useState, useEffect } from 'react';

import { 
	createStage, checkCollision, ghostTetrominoIsHigherThanMerge,
	adjustGhostForEmptyTetrominoArray
} from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
	const [stage, setStage] = useState(createStage());
	const [rowsCleared, setRowsCleared] = useState(0);
	const [merges, setMerges] = useState({});
	let mergeEntity = {};

	const buildTetromino = (tetromino, stage, coordY, coordX, ghostY = 0) =>
		tetromino.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value !== 0 && !isNaN(coordY)) {
					stage[coordY + y + ghostY][coordX + x] = [
						value,
						`${player.collided ? 'merged' : 'clear'}`,
						ghostY > 0 ? 'ghost' : '',
					];
				}
			});
		});

	const buildStage = template => {
		let mergeEntity = {};
		const newTemplate = template.map((row, y) =>
			row.map((cell, x) => {
				if (cell[1] === 'clear') {
					return [0, 'clear'];
				} else {
					if (Object.prototype.hasOwnProperty.call(mergeEntity, x.toString())) {
						mergeEntity = {
							...mergeEntity,
							[x.toString()]: [...mergeEntity[x.toString()] ,y],
						};
						setMerges({
							...mergeEntity,
						});
					} else {
						mergeEntity = {
							...mergeEntity,
							[x.toString()]: [y],
						};
						setMerges({
							...mergeEntity,
						});
					}
					return cell;
				}
			})
		);
		return newTemplate;
	}

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
				if (ghostTetrominoIsHigherThanMerge(clonedPlayer, merges, i)) {
					if((i + clonedPlayer.pos.y - player.pos.y) <= 2) {
						break;
					}
					// const adjustment = adjustGhostForEmptyTetrominoArray(clonedPlayer.tetromino, clonedPlayer.pos.y, clonedPlayer.pos.x, merges, i);
					buildTetromino(
						// player.tetromino, newStage, clonedPlayer.pos.y + adjustment, player.pos.x, i
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

	return [stage, setStage, rowsCleared, merges];
};
