import styled from 'styled-components';

const Tile = styled.div`
  background-color: #fffad1;
  border-radius: 4px;
  font-size: 24px;
  font-weight: 500;
  height: 48px;
  line-height: 48px;
  text-align: center;
  text-transform: uppercase;
  width: 48px;
`;

export const SelectedTile = styled(Tile)`
  background-color: grey;
`;

export default Tile;
