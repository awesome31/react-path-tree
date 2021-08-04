import React, { Fragment } from 'react';
import styles from './VerticalList.styles';

export interface VerticalListProps {
  steps: any[];
  borderColor: string;
}

const VerticalList = (props: VerticalListProps) => {
  const { steps, borderColor } = props;

  return (
    <div style={styles.mainList}>
      {steps.map((step, index) => (
        <Fragment key={index}>{step}</Fragment>
      ))}
      <div style={{ ...styles.line, borderColor }} />
    </div>
  );
};

export default VerticalList;
