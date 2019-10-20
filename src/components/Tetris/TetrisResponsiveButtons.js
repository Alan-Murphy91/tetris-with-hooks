import React, { useState } from 'react';

import {
	IDownArrowCircle, IChevronRight, IChevronLeft,
	IRotateRight, IRotateLeft
} from './StyledIcons';

import { StyledTetrisResponsiveButtonWrapper } from '../Tetris/StyledTetris';

import { snapTetromino } from '../../gameHelpers';

const TetrisResponsiveButtons = ({ 
	player, stage, dir, movePlayer, playerRotate, updatePlayerPos, merges,
	canDrop, setCanDrop
}) => {
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
				onClick={() => { 
					if (canDrop) {
						updatePlayerPos({x: 0, y: snapTetromino(stage, player, merges), collided: true}) 
					}
					setCanDrop(false);
				}}
				onKeyDown={() => {
					if (canDrop) {
						updatePlayerPos({x: 0, y: snapTetromino(stage, player, merges), collided: true}) 
					}
					setCanDrop(false);
				}}
				className="drop"
			>
				<IDownArrowCircle />
			</div>
		</StyledTetrisResponsiveButtonWrapper>
	)
}

export default TetrisResponsiveButtons;
