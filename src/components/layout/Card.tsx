//react
import React from 'react';
import styled from 'styled-components';

//types
import type { ComponentParams, SlotChildElement } from '@/model/ReactCustom';

//styles
const StyledCard = styled.div`
  &.card {
    position: relative;
    padding: 1.5em;
    border-radius: 0.35rem;
    box-shadow: 0 0 2px 1px var(--clr-border);

    .card-header {
      font-size: 2em;
      line-height: 0.9em;
      margin-top: -0.25em;
      margin-bottom: 1em;
    }
  }
`;

//component definition
const Card: React.FC<ComponentParams> = ({ children, className }) => {
  //state logic

  //slot logic
  const header = React.Children.toArray(children).filter((child) => {
    return (
      React.isValidElement<SlotChildElement>(child) &&
      child.props.slot === 'card-header'
    );
  });

  const cardContent = React.Children.toArray(children).filter((child) => {
    return (
      React.isValidElement<SlotChildElement>(child) &&
      child.props.slot === undefined
    );
  });

  //template
  return (
    <StyledCard className={`card${className ? ' ' + className : ''}`}>
      {header.length > 0 ? <div className="card-header">{header}</div> : null}
      {cardContent}
    </StyledCard>
  );
};

export default Card;
