import { ReactElement } from 'react';

export interface ComponentParams {
  children?: React.ReactNode;
  className?: string;
}

export interface SlotChildElement extends ReactElement {
  slot?: string;
  [key: string]: unknown;
}
