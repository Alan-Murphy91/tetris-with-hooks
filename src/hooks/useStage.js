import { useState, useEffect } from 'react';

import { createStage, checkCollision, checkCollisionWithGhost } from '../gameHelpers';


export const useStage = (player, resetPlayer) => {
	const [stage, setStage] = useState(createStage());
	const [rowsCleared, setRowsCleared] = useState(0);

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
		const mergeCoords = [];
		const newStage = prevStage.map((row, y) =>
			row.map((cell, x) => {
				if (cell[1] === 'clear') {
					return [0, 'clear'];
				} else {
					mergeCoords.push([y, x]);
					return cell;
				}
			})
		);
		player.tetromino.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value !== 0) {
					newStage[y + player.pos.y][x + player.pos.x] = [
						value,
						`${player.collided ? 'merged' : 'clear'}`,
					];
				}
			});
		});

		let iter = newStage.length - player.tetromino.length;
		for (let i = iter; i > player.pos.y; i -= 1) {
			const clonedPlayer = JSON.parse(JSON.stringify(player));
			clonedPlayer.pos.y = 0;
			if (!checkCollision(clonedPlayer, newStage, {x: 0, y: i })) {
				if((i + clonedPlayer.pos.y - player.pos.y) <= 2) {
					break;
				}
				player.tetromino.forEach((row, y) => {
					row.forEach((value, x) => {
						if(value !== 0) {
							newStage[i + y + clonedPlayer.pos.y][x + player.pos.x] = [
								value,
								'clear',
								'ghost'
							];
						}
					});
				});
				break;
			}
		}

		// while(iter > player.pos.y) {
		// 	console.log(iter, player.pos.y)
		// 	iter -= 1;
		// 	if (!checkCollision(player, newStage, {x: 0, y: iter })) {
		// 		console.log(player);
				// player.tetromino.forEach((row) => {
				// 	row.forEach((_, x) => {
				// 		newStage[newY + y + player.pos.y][x + player.pos.x] = [
				// 			1,
				// 			'clear',
				// 		];
				// 	});
				// });
		// 		return;
		// 	}
		// }
		


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
