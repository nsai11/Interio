import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const ReactGridLayout = WidthProvider(RGL);

export default class NoCompactingLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 0,
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function() {},
    verticalCompact: false,
  };
  


constructor(props) {
  super(props);

  this.state = {
    items: _.range(this.props.items).map(function(i) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 2,
        h: 2,
      };
    }),
    newCounter: 0
  };
  this.findWidth = this.findWidth.bind(this);
  this.onAddItem = this.onAddItem.bind(this);
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
}

 findWidth = () =>{
  if(this.state.i == 0)//sofa
    this.setState({w:4});
//   else if(this.state.i == 1)//plant
//     return 1;
//   else if(this.state.i == 2)//bed
//     return 5;
//   else if(item  == 3)//center table
//     return 2;
//   else if(item == 4)//single sofa
//     return 2;
//   else if(item == 5)//shelf
//     return 3;
}

// findHeight(item){
//   if(item == 0)//sofa
//     return 2;
//   else if(item == 1)//plant
//     return 1;
//   else if(item == 2)//bed
//     return 3;
//   else if(item  == 3)//center table
//     return 2;
//   else if(item == 4)//single sofa
//     return 2;
//   else if(item == 5)//shelf
//     return 2;
// }

createElement(el) {
  const removeStyle = {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer"
  };
  const i = el.add ? "+" : el.i;
  return (
    <div key={i} data-grid={el}>
        <span className="text">{i}</span>
      <span
        className="remove"
        style={removeStyle}
        onClick={this.onRemoveItem.bind(this, i)}
      >
        x
      </span>
    </div>
  );
}

onAddItem() {
  /*eslint no-console: 0*/
  console.log("adding", "n" + this.state.newCounter);
  this.setState({
    // Add a new item. It must have a unique key!
    items: this.state.items.concat({
      i: "n" + this.state.newCounter,
      x: (this.state.items.length * 2) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2
    }),
    // Increment the counter to ensure key is always unique.
    newCounter: this.state.newCounter + 1
  });
}

// We're using the cols coming back from this to calculate where to add new items.
onBreakpointChange(breakpoint, cols) {
  this.setState({
    breakpoint: breakpoint,
    cols: cols
  });
}

onLayoutChange(layout) {
  this.props.onLayoutChange(layout);
  this.setState({ layout: layout });
}

onRemoveItem(i) {
  console.log("removing", i);
  this.setState({ items: _.reject(this.state.items, { i: i }) });
}

render() {
  return (
    <div>
        <ReactGridLayout
        onLayoutChange={this.onLayoutChange}
        onBreakpointChange={this.onBreakpointChange}
        {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ReactGridLayout>
        <Container>
          <Button onClick={this.onAddItem}>Add Item</Button>
        </Container>
    </div>
  );
}
}


if (process.env.STATIC_EXAMPLES === true) {
  import("./t-hook.jsx").then(fn => fn.default(NoCompactingLayout));
}