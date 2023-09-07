//react
import React from 'react';
import styled from 'styled-components';

//components

//types
import type { ComponentParams, SlotChildElement } from '@/model/ReactCustom';

//styles
const StyledContainer = styled.div`
  &.normalizer-outer {
    position: relative;
    display: table;
    height: 100%;
    width: 100%;

    .normalizer-inner {
      display: table-cell;
      height: 1px;

      > * {
        min-height: 100%;
        min-width: 100%;
      }
    }
  }
`;

//component definition
const CoordinateContainer: React.FC<ComponentParams> = ({
  children,
  className,
}) => {
  //state logic

  //slot logic
  const slotContent = React.Children.toArray(children).filter((child) => {
    return (
      React.isValidElement<SlotChildElement>(child) &&
      child.props.slot === undefined
    );
  });

  //template
  return (
    <StyledContainer
      className={`normalizer-outer${className ? ' ' + className : ''}`}
    >
      <div className="normalizer-inner">{slotContent}</div>
    </StyledContainer>
  );
};

export default CoordinateContainer;
