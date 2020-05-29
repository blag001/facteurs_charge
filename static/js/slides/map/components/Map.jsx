import React from "react";
import Zone from "./Zone";

class Map extends React.Component {

  constructor(props) {
    super(props);
    // this.regionsDescriptions = regionDescription;
    
    this.zoneChanged = this.zoneChanged.bind(this);
  }

  zoneChanged(valeur) {
    this.props.zoneChanged(valeur);
  }
  
  getRandomColor() {
    var letters = '789ABCDEF';
    var color = '#';
    const c = Math.floor(Math.random() * 9);
    for (var i = 0; i < 6; i++) {
      color += letters[c];
    }
    return color;
  }

  render() {
    const regionsDescriptions = this.props.zonesDescription;

    let regions = [];
    for (let i = 0; i < regionsDescriptions.length; i++) {
      regions.push(
        <Zone
          key={regionsDescriptions[i].id} 
          description={regionsDescriptions[i]}
          color={this.getRandomColor()}
          zoneChanged={this.zoneChanged}
          onClick={(i) => this.zoneChanged(i)}
        />
      );
    }
    
    return (
      <div className="map">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" display="inline" version="1" viewBox="0 0 650 520">
          {regions}
        </svg>
      </div>
    );
  }
}

export default Map;