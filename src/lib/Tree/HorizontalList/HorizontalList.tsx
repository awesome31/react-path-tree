import React, { Fragment } from 'react';
import styles from './HorizontalList.styles';

export interface HorizontalListProps {
  steps: any[];
  borderColor: string;
}

const HorizontalList = (props: HorizontalListProps) => {
  const { borderColor, steps } = props;
  return (
    <div
      style={{
        ...styles.mainList,
        borderBottomColor: borderColor,
        borderTopColor: borderColor,
      }}
    >
      {steps.map((step, index) => (
        <Fragment key={index}>{step}</Fragment>
      ))}
    </div>
  );
};

export default HorizontalList;
