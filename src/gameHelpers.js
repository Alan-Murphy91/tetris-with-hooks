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

// export const checkCollisionWithGhost = (player, stage, { x: moveX, y: moveY}, mergeCoords, iter) => {
// 	for (let y = 0; y < player.tetromino.length; y += 1) {
// 		for (let x = 0; x < player.tetromino[y].length; x += 1) {
// 			for (let i = 0; i < mergeCoords.length; i += 1) {
// 				console.log(x,y, mergeCoords);
// 				if (mergeCoords[i][0] < y + iter && mergeCoords[i][1] === x) {
// 					return false;
// 				}
// 			}
// 			if (player.tetromino[y][x] !== 0) {
// 				if (
// 					!stage[y + player.pos.y + moveY] ||
// 					!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
// 					stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
// 				) {
// 					return true;
// 				}
// 			}
// 		}
// 	}
// }
