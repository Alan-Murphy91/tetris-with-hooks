export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
	Array.from(Array(STAGE_HEIGHT), () => 
		new Array(STAGE_WIDTH).fill([0, 'clear'])
	);

export const checkCollision = (player, stage, { x: moveX, y: moveY}) => {
	for (let y = 0; y < player.tetromino.length; y += 1) {
		for (let x = 0; x < player.tetromino[y].length; x += 1) {
			if (player.tetromino[y][x] !== 0) {
				if (
					!stage[y + player.pos.y + moveY] ||
					!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
					stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
				) {
					return true;
				}
			}
		}
	}
}

export const ghostTetrominoIsHigherThanMerge = (player, merges, moveY) => {
	for (let y = 0; y < player.tetromino.length; y += 1) {
		for (let x = 0; x < player.tetromino[y].length; x += 1) {
			if (player.tetromino[y][x] !== 0) {
				if (Object.prototype.hasOwnProperty.call(merges, (player.pos.x + x).toString())) {
					for (let i = 0; i < merges[player.pos.x + x].length; i += 1) {
						if (merges[player.pos.x + x][i] < player.pos.y + y + moveY) {
							return false;
						}
					}
				}
			}
		}
	}
	return true;
}

export const snapTetromino = (stage, player, merges) => {
	for (let i = stage.length - player.tetromino.length; i > player.pos.y; i -= 1) {
		const clonedPlayer = JSON.parse(JSON.stringify(player));
		clonedPlayer.pos.y = 0;
		
		if (!checkCollision(clonedPlayer, stage, {x: 0, y: i })) {
			if (ghostTetrominoIsHigherThanMerge(clonedPlayer, merges, i)) {
				return (i - player.pos.y);
			}
		}
	}
}

// the tetrominos need to have the same height and width for transformations. These
// helper methods determine whether an incoming matrix or a rotated one needs to
// unshift or push a new empty array

export const checkifRequiresEmptyArrForTransform = matrix => {
	if (matrix.length === matrix[0].length) {
		return matrix;
	}
	while (matrix.length < matrix[0].length) {
		matrix.unshift(Array(matrix[0].length).fill(0));
	}
	return matrix;
}

export const checkifMatrixRequiresPop = matrix => {
	let i = matrix.length - 1;
	while (matrix[i].findIndex(el => el !== 0) === -1) {
		matrix.pop();
		i -=1;
	}
	return matrix;
}

// export const checkifMatrixRequiresPop = matrix => {
// 	if (matrix[matrix.length - 1].findIndex(el => el !== 0) === -1) {
// 		matrix.pop();
// 		return matrix;
// 	}
// 	return matrix;
// }
