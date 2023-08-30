//react
import React from 'react';
import styled from 'styled-components';

//types
import type { ComponentParams } from '@/types/ReactCustom';

//styles
const StyledTrelloPortal = styled.div`
  height: 28rem;
  width: 100%;
  .trello-board {
    margin: 0;
    height: 28rem;
    width: 100%;
    display: table;
    iframe {
      border-radius: 0.25rem;
      box-shadow: 0 0 5px 1px var(--clr-dark-gray);
      display: table-cell;
      transform-origin: 0 0;
      transform: scale(0.75);
      height: 133%;
      width: 133%;
    }
  }
`;

//component definition
const TrelloPortal: React.FC<ComponentParams> = ({ className }) => {
  //state logic

  //slot logic

  //template
  return (
    <StyledTrelloPortal className={className ? ' ' + className : ''}>
      <div className="trello-board">
        <iframe src="https://trello.com/b/tPZY1jyz.html" frameBorder="0" />
      </div>
    </StyledTrelloPortal>
  );
};

export default TrelloPortal;
