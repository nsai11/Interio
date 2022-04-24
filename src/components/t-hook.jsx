import React from "react";
import ReactDOM from "react-dom";
import "../App.css"
import "./ex-styles.css";
//import "style-loader!css-loader!../App.css";
//import "style-loader!css-loader!./ex-styles.css";
typeof window !== "undefined" && (window.React = React); 
export default function makeLayout(Layout) {
 
  class ListeningLayout extends React.Component {
    state = { layout: [] };

    onLayoutChange = layout => {
      this.setState({ layout: layout });
    };

    stringifyLayout() {
      return this.state.layout.map(function (l) {
        const name = l.i === "__dropping-elem__" ? "drop" : l.i;
        return (
          <div className="layoutItem" key={l.i}>
            <b>{name}</b>
            {`: [${l.x}, ${l.y}, ${l.w}, ${l.h}]`}
          </div>
        );
      });
    }

    render() {
      return (
        <React.StrictMode>
          <div>
            <div className="layoutJSON">
              Displayed as <code>[x, y, w, h]</code>:
              <div className="columns">{this.stringifyLayout()}</div>
            </div>
            <Layout onLayoutChange={this.onLayoutChange} />
          </div>
        </React.StrictMode>
      );
    }
  }

  function run() {
    const contentDiv = document.getElementById("content");
    const gridProps = window.gridProps || {};
    ReactDOM.render(
      React.createElement(ListeningLayout, gridProps),
      contentDiv
    );
  }
  if (!document.getElementById("content")) {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  return ListeningLayout;
}
