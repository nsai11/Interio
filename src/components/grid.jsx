import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import Button from 'react-bootstrap/Button';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import sofa from "../assets/sofa.svg";
import plant from "../assets/plant.svg";
import bed from "../assets/bed.svg";
import center from "../assets/center.svg";
import single from "../assets/single.svg";
import shelf from "../assets/shelf.svg";
const ReactGridLayout = WidthProvider(RGL);

export default class NoCompactingLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 0,
    cols: 18,
    rowHeight: 30,
    onLayoutChange: function() {},
    verticalCompact: false,
  };
  


constructor(props) {
  super(props);

  this.state = {
    items: _.range(this.props.items).map(function(i) {
      return {
        i: 0,
        x: i * 2,
        y: 0,
        w: 2,
        h: 2,
        images : [{id:0,img:sofa},
                  {id:1,img:plant},
                  {id:2,img:bed},
                  {id:3,img: center},
                  {id:4,img:single},
                  {id:5,img:shelf}]
      };
    }),
    newCounter: 0
  };
  this.findWidth = this.findWidth.bind(this);
  this.onAddItem = this.onAddItem.bind(this);
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
}

 findWidth(i){
  if(i == 0){//sofa
    return 4;
  }
  else if(i == 1)//plant
    return 1;
  else if(i == 2)//bed
    return 5;
  else if(i  == 3)//center table
    return 2;
  else if(i == 4)//single sofa
    return 2;
  else if(i == 5)//shelf
    return 1;
}

findHeight(item){
  if(item == 0)//sofa
    return 3;
  else if(item == 1)//plant
    return 1.5;
  else if(item == 2)//bed
    return 6;
  else if(item  == 3)//center table
    return 3;
  else if(item == 4)//single sofa
    return 4;
  else if(item == 5)//shelf
    return 4.5;
}

createElement(el) {
  const removeStyle = {
    position: "absolute",
    right: "-4px",
    top: 0,
    cursor: "pointer",
  };
  console.log(el.images[0].img);
  const i = el.add ? "+" : el.i;
  return (
    <div key={i} data-grid={el}>
        <img key={i} src={el.images[i].img}></img>
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
      i: this.state.newCounter,
      x: (this.state.items.length * 2) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: this.findWidth(this.state.newCounter),
      h: this.findHeight(this.state.newCounter),
      images:[{id:0,img:sofa},
              {id:1,img:plant},
              {id:2,img:bed},
              {id:3,img:center},
              {id:4,img:single},
              {id:5,img:shelf}]
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
        <Button onClick={this.onAddItem}>Add Item</Button>
        
    </div>
  );
}
}


if (process.env.STATIC_EXAMPLES === true) {
  import("./t-hook.jsx").then(fn => fn.default(NoCompactingLayout));
}