import { ListVertical } from './Tree.class';
import { workflowTreeCreator } from './Tree.creator';
import { renderTree } from './Tree.generator';
import { TreeData, Node } from './types';

export const orEmptyArray = (arr: any) => arr || [];

export const getFirstNode = (treeData: TreeData): any =>
  Object.values(treeData).find(node => node.incomingNodes.length === 0);

/**
 * @description This function returns all the possible paths based on the tree data.
 */
export const getAllPaths = (
  id: string,
  treeData: TreeData,
  accumlator: string[],
  finalList: string[][]
) => {
  if (treeData[id].outgoingNodes.length === 0) {
    accumlator.push(id);
    finalList.push([...accumlator]);

    return;
  }

  accumlator.push(id);
  treeData[id].outgoingNodes.forEach(identifier => {
    getAllPaths(identifier, treeData, accumlator, finalList);
    accumlator.pop();
  });
};

/**
 * @description This function returns the smallest length path.
 */
export const getSmallestLengthPath = (paths: string[][]): string[] =>
  orEmptyArray(
    paths.reduce(
      (acc: string[] | undefined, path) =>
        acc && acc.length > path.length ? path : acc,
      undefined
    )
  );

/**
 * @description This function returns the meet node.
 */
export const getMeetNode = (paths: string[][]): any => {
  const smallestLengthPath = getSmallestLengthPath(paths);
  let meetNode = null;
  smallestLengthPath.every(id => {
    let hasAll = true;
    paths.forEach(path => {
      if (path.indexOf(id) === -1) {
        hasAll = false;
      }
    });

    if (hasAll === true) {
      meetNode = id;
      return false;
    } else {
      return true;
    }
  });

  return meetNode;
};

/**
 * @description This functions returns the meet node for horizontal list.
 */
export const getMeetNodeForListHorizontal = (
  treeData: TreeData,
  outgoingNodes: string[]
) => {
  let acc: string[] = [];
  let finalList: string[][] = [];

  outgoingNodes.forEach(node => {
    acc = [];
    getAllPaths(node, treeData, acc, finalList);
  });

  return getMeetNode(finalList);
};

export const renderTreeView = (
  firstNodeId: Node,
  treeData: TreeData,
  lineColor: string,
  lineHeight: number,
  gapWidth: number
) => {
  if (firstNodeId && treeData) {
    let acc: any[] = [];
    workflowTreeCreator(
      firstNodeId,
      treeData,
      acc,
      null,
      {},
      lineColor,
      lineHeight,
      gapWidth
    );

    return renderTree(new ListVertical(acc, lineColor));
  } else {
    return null;
  }
};
