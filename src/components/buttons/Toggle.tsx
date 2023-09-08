//react
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

//types
import type { ComponentParams } from '@/model/ReactCustom';
export type ToggleParams = ComponentParams & {
  toggled: boolean;
  disabled?: boolean;
  label?: string;
  width?: string;
  onClick: () => void;
};

//styles
const StyledToggle = styled.div`
  &.toggle {
    --toggle-speed: 0.2s;
    --knob-diameter: 1.35em;
    --border-radius: 1em;
    --toggle-width: 2.5em;

    position: relative;
    display: flex;
    align-items: center;
    width: var(--toggle-width);
    height: 1em;
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
    }

    .knob {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      transition: left var(--toggle-speed) ease-out;
      background-color: var(--clr-font);
      width: var(--knob-diameter);
      height: var(--knob-diameter);
      border-radius: var(--knob-diameter);
      border: 1px solid var(--clr-border);
    }

    .label {
      position: absolute;
      top: 50%;
      font-size: 0.9em;
      transform: translate(50%, -50%);
      right: calc(50% - var(--border-radius) / 2);
    }

    .outer-bar {
      flex-basis: 100%;
      border-radius: var(--border-radius);
      border: 1px solid var(--clr-border);
      height: 100%;
      .inner-bar {
        width: 0;
        height: 100%;
        border-radius: var(--border-radius);
        transition: width var(--toggle-speed) ease-out;
        background-color: var(--clr-primary);
      }
    }

    &.toggled {
      color: var(--clr-black);
      .label {
        right: unset;
        transform: translate(-50%, -50%);
        left: calc(50% - var(--border-radius) / 2);
      }

      .knob {
        left: calc(100% - var(--knob-diameter));
      }

      .inner-bar {
        width: 100%;
      }
    }
  }
`;

//component definition
const Toggle: React.FC<ToggleParams> = ({
  className,
  toggled,
  disabled,
  label,
  width,
  onClick,
}) => {
  //template
  return (
    <StyledToggle
      className={`
        toggle
        ${toggled ? ' toggled' : ''}
        ${disabled ? ' disabled' : ''}
        ${className ? ' ' + className : ''}
      `}
      style={width ? ({ '--toggle-width': width } as React.CSSProperties) : {}}
      onClick={disabled ? () => {} : () => onClick()}
    >
      <span className="knob" />
      {label ? <span className="label">{label}</span> : null}
      <div className="outer-bar">
        <div className="inner-bar" />
      </div>
    </StyledToggle>
  );
};

export default Toggle;
