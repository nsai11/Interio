import React,{ useState,useRef, useEffect } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-multi-carousel/lib/styles.css";
import sofa from "../assets/sofa.svg";
import plant from "../assets/plant.svg";
import bed from "../assets/bed.svg";
import center from "../assets/center.svg";
import single from "../assets/single.svg";
import shelf from "../assets/shelf.svg";
import Card from "react-bootstrap/Card";
const ReactGridLayout = WidthProvider(RGL);
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import sofaimg from "../assets/sofa-2.jpeg";
import plantimg from "../assets/plant.jpeg";
import bedimg from "../assets/bed-2.jpeg";
import centerimg from "../assets/coffee-table-2.jpeg";
import shelfimg from "../assets/storage-2.jpeg";
import singleimg from "../assets/sofa-single-1.webp";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const margin = {
  margin: "1em",
}
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
        images : "",
      };
    }),
    newCounter: 0
  };
  this.getData = this.getData.bind(this);
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
}

getData(i){
  if(i == 0)
    return [sofa,4,3]
    else if(i == 1)//plant
    return  [plant,1,1.5];
  else if(i == 2)//bed
    return [bed,5,6];
  else if(i  == 3)//center table
    return [center,2,3];
  else if(i == 4)//single sofa
    return [single,2,4];
  else if(i == 5)//shelf
    return [shelf,1,4.5];
}

createElement(el) {
  const removeStyle = {
    position: "absolute",
    right: "-4px",
    top: 0,
    cursor: "pointer",
  };
  console.log(el.images);
  const i = el.add ? "+" : el.i;
  return (
    <div key={i} data-grid={el}>
        <img key={i} src={el.images}></img>
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

onAddItem(el) {
  /*eslint no-console: 0*/
  console.log("adding", "n" + this.state.newCounter);
  var data = this.getData(el);
  this.setState({
    // Add a new item. It must have a unique key!
    items: this.state.items.concat({
      i: this.state.newCounter,
      x: (this.state.items.length * 2) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: data[1],
      h: data[2],
      images: data[0],
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

clear(){
  this.setState(({items: 0}));
}


render() {
  return (
    <div>
        <div style={{margin:"5em"}}>
          <Carousel responsive = {responsive} autoPlay={false} infinite={false}>
            <Card style={{margin:"1em"}}>
              <Card.Img src={sofaimg} variant="top" style={{height:"10em", width: "10em"}}/>
              <Card.Body>
                <Card.Title>Navi Sofa & Loveseat in Chestnut</Card.Title>
                <Card.Text>
                  No matter the weather, it’s better together! The Navi Sofa & Loveseat in Chestnut can make a room look more comfortable.
                </Card.Text>
                <button className="btn1 hero-btn" onClick={()=>this.onAddItem(0)}>Add Item</button>
              </Card.Body>
            </Card>
            <Card style={{margin:"1em"}}>
            <Card.Img src={plantimg} variant="top" style={{height:"10em", width: "10em"}}/>
              <Card.Body>
              <Card.Title>Green Plant in Plant Stand </Card.Title>
                <Card.Text>
                Add a touch of greenery and warmth to your decor with this Green Plant in Plant Stand from Threshold.
                </Card.Text>
                <button className="btn1 hero-btn" onClick={()=>this.onAddItem(1)}>Add Item</button>
              </Card.Body>
            </Card>
            <Card style={{margin:"1em"}}>
              <Card.Img src={bedimg} variant="top" style={{height:"10em", width: "10em"}}/>
              <Card.Body>
                <Card.Title>Sydney Bed, Natural</Card.Title>
                <Card.Text>
                Panel headboard and footboard with woven cane detailing. Assembly required.Queen weight: approximately 148 lbs
                </Card.Text>
                <button className="btn1 hero-btn" onClick={()=>this.onAddItem(2)}>Add Item</button>
              </Card.Body>
            </Card>
            <Card style={{margin:"1em"}}>
            <Card.Img src={centerimg} variant="top" style={{height:"10em", width: "10em"}}/>
              <Card.Body>
                <Card.Title>Hensley  Coffee Table</Card.Title>
                <Card.Text>
                We love the way the tempered glass helps the room feel larger and more spacious. The black metal frame adds a classic look.
                </Card.Text>
                <button className="btn1 hero-btn" onClick={()=>this.onAddItem(3)}>Add Item</button>
              </Card.Body>
            </Card>
            <Card style={{margin:"1em"}}>
            <Card.Img src={singleimg} variant="top" style={{height:"10em", width: "10em"}}/>
              <Card.Body>
                <Card.Title>Aurora lounge chair</Card.Title>
                <Card.Text>
                The Abisko chair in Aurora Brown brings a deep and dreamy feel to your modern space. 
                </Card.Text>
                <button className="btn1 hero-btn" onClick={()=>this.onAddItem(4)}>Add Item</button>
              </Card.Body>
            </Card>
            <Card style={{margin:"1em"}}>
            <Card.Img src={shelfimg} variant="top" style={{height:"10em", width: "10em"}}/>
              <Card.Body>
                <Card.Title>Orviston Armoire</Card.Title>
                <Card.Text>
                Crafted from manufactured oak wood, this piece features two doors that open to reveal an included clothing rod.
                </Card.Text>
                <button className="btn1 hero-btn" onClick={()=>this.onAddItem(5)}>Add Item</button>
              </Card.Body>
            </Card>
          </Carousel>
          <button className="btn1 hero-btn" style={margin} onClick={this.clear.bind(this)}>Reset All</button>
        </div>
        <ReactGridLayout
        onLayoutChange={this.onLayoutChange}
        onBreakpointChange={this.onBreakpointChange}
        {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ReactGridLayout>
        <h4 style={{display:"flex", justifyContent:"center"}}>
        <span>&#8593;</span>Floor plan above(20 ft x 12 ft Est. unless resized) <span>&#8593;</span>
        </h4>
    </div>
  );
}
}

if (process.env.STATIC_EXAMPLES === true) {
  import("./t-hook.jsx").then(fn => fn.default(NoCompactingLayout));
}