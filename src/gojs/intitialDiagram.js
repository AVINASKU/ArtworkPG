
import * as go from 'gojs';
/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
export function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    go.Diagram.licenseKey = "288647e1b26f4fc702d90776423d68f919a42d63998017a30c0447f6be1a78132ac9e97806838f94d1fb4afc1874c4dc88cc682dc34b053be332d5df17b185fdb26376b1410e4786a25623c699aa7aa5a97873f7c6bc73f18d7c85f1e3adc09a5bbaf78749c908ba212a54645e76fb43e3e9c97dac52ca4f393d99b5eaeaae4af8737e9b98";

    const diagram =
      $(go.Diagram,
        {
          'undoManager.isEnabled': true,  // must be set to allow for model change listening
          // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
          layout: new go.TreeLayout({ angle:0,layerSpacing:35}),
          'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
          model: new go.GraphLinksModel(
            {
              linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
            })
        });
  
    // define a simple Node template
    diagram.nodeTemplate =
      $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { name: 'SHAPE', fill: 'white', strokeWidth: 0},
          // Shape.fill is bound to Node.data.color
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { margin: 18, editable: true },  // some room around the text
          new go.Binding('text').makeTwoWay()
        )
      );
    return diagram;
}