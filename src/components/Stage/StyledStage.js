import styled from 'styled-components';

export const StyledStage = styled.div`
	display: grid;
	grid-template-rows: repeat(
		${props => props.height},
		20px
	);
	grid-template-columns: repeat(${props => props.width}, 20px);
	grid-gap: 1px;
	border: 2px solid #333;
	width: 252px;
	background: #111;
`;
