import React from 'react';
import HorizontalList from './HorizontalList/HorizontalList';
import VerticalList from './VerticalList/VerticalList';
import { ListHorizontal, ListVertical } from './Tree.class';

export const generateWorkflowTree = (
  currentNode: ListVertical | ListHorizontal | any
) => {
  if (currentNode instanceof ListVertical) {
    return (
      <VerticalList
        steps={currentNode.steps.map(node => generateWorkflowTree(node))}
        borderColor={currentNode.color}
      />
    );
  } else if (currentNode instanceof ListHorizontal) {
    return (
      <HorizontalList
        steps={currentNode.verticalLists.map(node =>
          generateWorkflowTree(node)
        )}
        borderColor={currentNode.color}
      />
    );
  } else {
    return currentNode.component;
  }
};

export const renderTree = (finalList: ListVertical) =>
  generateWorkflowTree(finalList);
