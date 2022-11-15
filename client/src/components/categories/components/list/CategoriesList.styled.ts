import styled from 'styled-components';

import {Row} from 'components/bootstrap';

import {listTopMargin, mediaQueries} from 'styles/shared';

export const list = styled(Row)`
  margin-top: ${listTopMargin};

  @media ${mediaQueries.desktopMin} {
    margin-top: calc(${listTopMargin} - 2rem);
  }
`;
