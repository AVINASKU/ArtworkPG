import React from "react";

import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import "./GoJs.scss";

// ...

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  go.Diagram.licenseKey =
    "288647e1b26f4fc702d90776423d68f919a42d63998017a30c0447f6be1a78132ac9e97806838f94d1fb4afc1874c4dc88cc682dc34b053be332d5df17b185fdb26376b1410e4786a25623c699aa7aa5a97873f7c6bc73f18d7c85f1e3adc09a5bbaf78749c908ba212a54645e76fb43e3e9c97dac52ca4f393d99b5eaeaae4af8737e9b98";

  const diagram = $(go.Diagram, {
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
    "clickCreatingTool.archetypeNodeData": {
      text: "new node",
      color: "lightblue",
    },
    model: new go.GraphLinksModel({
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto", // the Shape will go around the TextBlock
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    $(
      go.Shape,
      "RoundedRectangle",
      { name: "SHAPE", fill: "white", strokeWidth: 0 },
      // Shape.fill is bound to Node.data.color
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      { margin: 8, editable: true }, // some room around the text
      new go.Binding("text").makeTwoWay()
    )
  );

  diagram.layout = $(go.TreeLayout, { angle: 0 , layerSpacing:20, rowSpacing:30, setsPortSpot:true,});

  return diagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is discussed below.
 */
function handleModelChange(changes) {
  // alert(JSON.stringify(changes));
}

// render function...
function GoJsComponent() {
  return (
    <div>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={[
          { key: 0, text: "Alpha", color: "lightblue", loc: "0 0" },
          { key: 1, text: "Beta 3", color: "orange", loc: "150 0" },
          { key: 2, text: "Gamma", color: "lightgreen", loc: "0 150" },
          { key: 3, text: "Delta", color: "pink", loc: "150 150" },
          { key: 1, text: "Alpha", icon: "home", color: "darkred" },
          { key: 2, text: "Beta", icon: "spade", color: "blue" },
          { key: 3, text: "Gamma", icon: "heart", color: "green" },
          { key: 4, text: "Delta", icon: "diamond", color: "lightblue" },
          { key: 5, text: "Epsilon", icon: "club", color: "orange" },
          { key: 12, text: "Beta 2", icon: "spade", color: "blue" },
          { key: 13, text: "Gamma 2", icon: "heart", color: "green" },
          { key: 14, text: "Delta 2", icon: "diamond", color: "lightblue" },
          { key: 15, text: "Epsilon 2", icon: "club", color: "orange" },
        ]}
        linkDataArray={[
          { key: -1, from: 0, to: 1 },
          { key: -2, from: 0, to: 2 },
          { key: -7, from: 1, to: 1 },
          { key: -4, from: 2, to: 3 },
          { key: -5, from: 3, to: 0 },
          { key: -15, from: 1, to: 2 },
          { key: -1, from: 1, to: 3 },
          { key: -2, from: 1, to: 4 },
          { key: -8, from: 1, to: 5 },
          { key: -10, from: 2, to: 12 },
          { key: -14, from: 3, to: 13 },
          { key: -3, from: 4, to: 14 },
          { key: -13, from: 5, to: 15 },
          { key: -12, from: 3, to: 15 },
          { key: -11, from: 5, to: 12 },
          { key: -10, from: 13, to: 14 },
        ]}
        onModelChange={handleModelChange}
      />
    </div>
  );
}

export default GoJsComponent;
