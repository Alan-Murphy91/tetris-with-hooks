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

export const ghostTetrominoIsHigherThanMerge = (player, mergeCoords, moveY) => {
	for (let y = 0; y < player.tetromino.length; y += 1) {
		for (let x = 0; x < player.tetromino[y].length; x += 1) {
			if (player.tetromino[y][x] !== 0) {
				if (Object.prototype.hasOwnProperty.call(mergeCoords, (player.pos.x + x).toString())) {
					for (let i = 0; i < mergeCoords[player.pos.x + x].length; i += 1) {
						if (mergeCoords[player.pos.x + x][i] < player.pos.y + y + moveY) {
							return false;
						}
					}
				}
			}
		}
	}
	return true;
}

