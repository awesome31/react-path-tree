import React from 'react';

class Step {
  constructor(
    public id: string,
    public component: React.ReactNode,
    public incomingNodes: string[],
    public outgoingNodes: string[]
  ) {}
}

class Connector {
  constructor(
    public component: React.ReactNode,
    public incomingNodes: string[],
    public outgoingNodes: string[]
  ) {}
}

class ListHorizontal {
  constructor(
    public verticalLists: (Step | ListVertical)[],
    public meetNode: Step,
    public color: string
  ) {}

  addToList(verticalList: any) {
    this.verticalLists = this.verticalLists.concat(verticalList);
  }
}

class ListVertical {
  constructor(public steps: (Step | ListHorizontal)[], public color: string) {}
}

export { Step, Connector, ListHorizontal, ListVertical };
