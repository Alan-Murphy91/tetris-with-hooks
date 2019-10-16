import React, { useState } from 'react';

import { StyledTetrisResponsiveButtonWrapper } from '../Tetris/StyledTetris';

import { snapTetromino } from '../../gameHelpers';

const TetrisResponsiveButtons = ({ player, stage, dir, movePlayer, playerRotate, updatePlayerPos, merges }) => {
	return (
		<StyledTetrisResponsiveButtonWrapper>
			<div 
				onClick={() => { playerRotate(stage, dir) }}
				onKeyDown={() => { playerRotate(stage, dir) }}
				className="rotate"
			>
				Rotate Left
			</div>
			<div 
				onClick={() => { movePlayer(dir) }}
				onKeyDown={() => { movePlayer(dir) }}
				className="direction"
			>
				Move Left
			</div>
			<div 
				onClick={() => { updatePlayerPos({x: 0, y: snapTetromino(stage, player, merges), collided: true}) }}
				onKeyDown={() => { updatePlayerPos({x: 0, y: snapTetromino(stage, player, merges), collided: true}) }}
				className="drop"
			>
				Drop
			</div>
		</StyledTetrisResponsiveButtonWrapper>
	)
}

export default TetrisResponsiveButtons;
