import React from 'react';
import { StyledCell } from './StyledCell';
import { TETROMINOS } from '../../tetrominos';

const Cell = ({ type, ghost = false }) => {
	return (
		<StyledCell type={type} color={TETROMINOS[type].color} ghost={ghost} />
	);
};

export default React.memo(Cell);
