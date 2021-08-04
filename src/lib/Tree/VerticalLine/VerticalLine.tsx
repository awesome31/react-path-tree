import React from 'react';
import styles from './VerticalLine.styles';

export interface VerticalLineProps {
  borderColor: string;
  lineHeight: number;
}

const VerticalLine = (props: VerticalLineProps) => (
  <div
    style={{
      ...styles.line,
      borderColor: props.borderColor,
      height: props.lineHeight,
    }}
  ></div>
);

export default VerticalLine;
