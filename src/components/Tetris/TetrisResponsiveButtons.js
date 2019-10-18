import React, { useState } from 'react';

import {
	IDownArrowCircle, IChevronRight, IChevronLeft,
	IRotateRight, IRotateLeft
} from './StyledIcons';

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
				{dir === -1 ? <IRotateLeft /> : <IRotateRight />}
			</div>
			<div 
				onClick={() => { movePlayer(dir) }}
				onKeyDown={() => { movePlayer(dir) }}
				className="direction"
			>
				{dir === -1 ? <IChevronLeft /> : <IChevronRight />}
			</div>
			<div 
				onClick={() => { updatePlayerPos({x: 0, y: snapTetromino(stage, player, merges), collided: true}) }}
				onKeyDown={() => { updatePlayerPos({x: 0, y: snapTetromino(stage, player, merges), collided: true}) }}
				className="drop"
			>
				<IDownArrowCircle />
			</div>
		</StyledTetrisResponsiveButtonWrapper>
	)
}

export default TetrisResponsiveButtons;
