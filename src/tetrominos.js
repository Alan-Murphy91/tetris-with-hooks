export const TETROMINOS = {
	0: { shape: [[0]], color: '0, 0, 0'},
	I: {
		shape: [
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0]
		],
		color: '64, 191, 251',
	},
	J: {
		shape: [
			[0, 'J', 0],
			[0, 'J', 0],
			['J', 'J', 0]
		],
		color: '182, 72, 170',
	},
	L: {
		shape: [
			[0, 'L', 0],
			[0, 'L', 0],
			[0, 'L', 'L']
		],
		color: '248, 130, 38',
	},
	O: {
		shape: [
			['O', 'O'],
			['O', 'O']
		],
		color: '250, 182, 54',
	},
	S: {
		shape: [
			[0, 0, 0],
			[0, 'S', 'S'],
			['S', 'S', 0]
		],
		color: '128, 205, 35',
	},
	T: {
		shape: [
			[0, 0, 0],
			['T', 'T', 'T'],
			[0, 'T', 0]
		],
		color: '132, 61, 198',
	},
	Z: {
		shape: [
			[0, 0, 0],
			['Z', 'Z', 0],
			[0, 'Z', 'Z'],
		],
		color: '240, 37, 71',
	},
}

export const randomTetromino = () => {
	const tetrominos = 'IJLOSTZ';
	const randTetromino = 
		tetrominos[Math.floor(Math.random() * tetrominos.length)];
	return	TETROMINOS[randTetromino];
}
