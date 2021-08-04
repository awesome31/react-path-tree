import React from 'react';

export type StyleSheet = { [key: string]: React.CSSProperties };

export type Node = {
  id: string;
  incomingNodes: string[];
  outgoingNodes: string[];
  component: React.ReactNode;
};

export type TreeData = { [key: string]: Node };

export type IdsCreatedMapType = { [key: string]: boolean };
