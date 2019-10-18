import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	background: black;
	background-size: cover;
	overflow: hidden;
`

export const StyledTetrisResponsiveButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100px;
	height: 100%;
	justify-content: center;

	div {
		height: 100px;
		color: white;
	}

	@media (min-width: 1025px) {
		display: none;
	}
`

export const StyledTetris = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 300px;
	margin: 0 auto;
	aside {
		padding: 0 20px;
	}
`

export const StyledAside = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 255px;
`
