import React from 'react';

import Cell from '../Cell/Cell';

import { StyledStage } from './StyledStage';

const Stage = ({ stage }) => {
	return (
		<StyledStage width={stage[0].length} height={stage.length}>
			{stage.map(row => row.map((cell, x) => 
				<Cell 
					key={x} 
					type={cell[0]} 
					ghost={cell[2] ? true : false}
				/>)
			)}
		</StyledStage>
	);
};

export default Stage;
