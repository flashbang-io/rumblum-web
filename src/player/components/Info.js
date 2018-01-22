import styled from 'styled-components';
import { sizeNormal } from '../../shared/components/theme/style';

export default styled.div`
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.info};
  color: ${props => props.theme.colors.white};
  ${sizeNormal}
  margin-bottom: 10px;
`;
