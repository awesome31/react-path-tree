import React from 'react';
import { ListHorizontal, ListVertical, Connector, Step } from './Tree.class';
import { getMeetNodeForListHorizontal } from './Tree.utils';
import { IdsCreatedMapType, TreeData, Node } from './types';
import VerticalLine from './VerticalLine/VerticalLine';

const renderGap = (width: number) => ({
  component: <div style={{ width }}></div>,
});

export const workflowTreeCreator = (
  currentNode: Node,
  treeData: TreeData,
  acc: any[],
  meetNode: string | null,
  idsCreatedMap: IdsCreatedMapType,
  lineColor: string,
  lineHeight: number,
  gapWidth: number
) => {
  if (idsCreatedMap[currentNode.id]) {
    return;
  }

  if (!idsCreatedMap[currentNode.id]) {
    acc.push(
      new Step(
        currentNode.id,
        currentNode.component,
        currentNode.incomingNodes,
        currentNode.outgoingNodes
      )
    );

    acc.push(
      new Connector(
        (<VerticalLine borderColor={lineColor} lineHeight={lineHeight} />),
        [currentNode.id],
        currentNode.outgoingNodes
      )
    );

    idsCreatedMap[currentNode.id] = true;
  }

  if (currentNode.outgoingNodes[0] === meetNode) {
    return;
  } else if (currentNode.outgoingNodes.length > 1) {
    const localMeetNode = getMeetNodeForListHorizontal(
      treeData,
      currentNode.outgoingNodes
    );
    const currentLength = acc.length;
    const localHorizontalList = new ListHorizontal(
      [],
      localMeetNode,
      lineColor
    );

    if (localMeetNode) {
      workflowTreeCreator(
        treeData[localMeetNode],
        treeData,
        acc,
        null,
        idsCreatedMap,
        lineColor,
        lineHeight,
        gapWidth
      );

      idsCreatedMap[localMeetNode] = true;
    }

    currentNode.outgoingNodes.forEach(nodeId => {
      let accumalator: any[] = [
        new Connector(
          (<VerticalLine borderColor={lineColor} lineHeight={lineHeight} />),
          [currentNode.id],
          [nodeId]
        ),
      ];
      workflowTreeCreator(
        treeData[nodeId],
        treeData,
        accumalator,
        localMeetNode,
        idsCreatedMap,
        lineColor,
        lineHeight,
        gapWidth
      );

      localHorizontalList.addToList(new ListVertical(accumalator, lineColor));
      localHorizontalList.addToList(renderGap(gapWidth));
    });
    acc.splice(currentLength, 0, localHorizontalList);
    acc.splice(
      currentLength + 1,
      0,
      new Connector(
        (<VerticalLine borderColor={lineColor} lineHeight={lineHeight} />),
        currentNode.outgoingNodes,
        []
      )
    );
  } else if (currentNode.outgoingNodes.length === 1) {
    workflowTreeCreator(
      treeData[currentNode.outgoingNodes[0]],
      treeData,
      acc,
      meetNode,
      idsCreatedMap,
      lineColor,
      lineHeight,
      gapWidth
    );
  } else if (currentNode.outgoingNodes.length === 0) {
    return;
  }
};
