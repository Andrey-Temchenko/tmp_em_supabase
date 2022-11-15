import styled, {css} from 'styled-components';

import {colors} from 'styles/shared';

export const alert = styled.div`
  ${props =>
    props.isSuccess &&
    css`
      color: ${colors.green_main};
      background-color: ${colors.green_light};
      border-color: ${colors.green_lighter};
    `}

  ${props =>
    props.isWarning &&
    css`
      color: ${colors.orange_main};
      background-color: ${colors.orange_light};
      border-color: ${colors.orange_lighter};
    `}

    ${props =>
    props.isError &&
    css`
      color: ${colors.red_main};
      background-color: ${colors.red_light};
      border-color: ${colors.red_lighter};
    `}
`;
