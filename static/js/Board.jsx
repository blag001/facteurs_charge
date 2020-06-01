import React, { createRef } from 'react'

import Navbar from './Navbar';

import SlidePowerSources from "./slides/power-sources-breakdown/components/SlidePowerSources";
import SlideLoad from './slides/load-breakdown/components/SlideLoad';
import SlideMap from './slides/map/components/SlideMap';


import stubZonesDescription from "./regions-descriptions";

import _ from "lodash";

import 'moment/locale/fr';


import { ZoneContext } from './ZoneContext';


var that;

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    that = this;

    this.zonesDescription = this.getZoneDescriptions();
    this.zoneChanged = this.zoneChanged.bind(this);
    this.state = {
      currentZone: { "id": 0, "label": "France" },
    };

  }

  getZoneDescriptions() {
    return stubZonesDescription;
  }

  componentDidMount() {
    this.setState({
      actionsVisibles: true,
      currentZone: { id: 0, label: "France" } //fixme
    });
  }

  zoneChanged(newZoneID) {
    console.log("New zone : ", newZoneID);
    let currentZoneSelected = _.find(this.zonesDescription, { 'id': newZoneID });
    let labelCurrentZone = currentZoneSelected.label;

    this.setState({ currentZone: { id: newZoneID, label: labelCurrentZone } });
  }

  render() {
    return (
      <React.Fragment>
        <header >
          <Navbar that={that} label_region={this.state.currentZone.label} hookZoneChanged={this.zoneChanged} zonesDescription={this.zonesDescription} />
        </header>

        <div className="section is-medium" id="slide-map" style={{"marginTop":"3rem"}}>
          <div className="container">
            <SlideMap zoneChanged={this.zoneChanged} zonesDescription={this.zonesDescription} />
          </div>
        </div>
        

        <ZoneContext.Provider value={{ currentZone: this.state.currentZone }}>
          <div className="section is-medium" id="slide-installations"  style={{"paddingTop":"5rem"}}>
            <div className="container">
              <SlidePowerSources />
            </div>
          </div>
          <div className="section is-medium" id="slide-load"  style={{"paddingTop":"5rem"}}>
            <SlideLoad />
          </div>
        </ZoneContext.Provider>
      </React.Fragment>
    )
  }
}