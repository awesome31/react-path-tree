import { getFirstNode, renderTreeView } from './Tree.utils';
import { TreeData } from './types';

export interface TreeProps {
  treeData: TreeData;
  lineHeight?: number;
  gapWidth?: number;
  lineColor?: string;
}

export const Tree = (props: TreeProps) => {
  const {
    treeData,
    lineColor = 'black',
    lineHeight = 20,
    gapWidth = 50,
  } = props;

  return renderTreeView(
    getFirstNode(treeData),
    treeData,
    lineColor,
    lineHeight,
    gapWidth
  );
};
