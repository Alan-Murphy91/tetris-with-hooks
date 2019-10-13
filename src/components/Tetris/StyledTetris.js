import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: black;
	background-size: cover;
	overflow: hidden;
`

export const StyledTetris = styled.div`
	display: flex;
	flex-direction: column;
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
