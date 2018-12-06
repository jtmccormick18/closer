// @flow
import turf from '@turf/turf';
import React, { Component,Fragment } from 'react';
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import nearbyCities from 'nearby-cities';



// const MyPopupMarker = (props) => (
//   <Marker position={props.position}>
//     <Popup>{props.content}</Popup>
//   </Marker>
// )
{/* <Map center={this.state.markers[2].position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <MyMarkersList markers={this.state.markers} />
      </Map> */}

// const MyMarkersList = (props) => {
//   const items=props.markers.map(i => (
//     <MyPopupMarker key={i.key} position={i.position} content={i.content} />
//   ))
//   return <Fragment>{items}</Fragment>
// }
const DisplayCities=(props)=>(
  <div>
    <p>{props.midpoint}</p>
   
  </div>
)

class MidPoint extends React.Component {
  state = {
    pointA: [41.881832,-87.623177],
    pointB:[33.753746,-84.386330],
    midpoint:[],
    nearbyCities:[]
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getMidPoint=() => {
    // let point1=turf.point(this.state.pointA);
    // let point2=turf.pointthis.state.pointB;
    let midpoint = turf.midpoint(this.state.pointA, this.state.pointB);
    // let cities=nearbyCities(midpoint);
    this.setState({
      midpoint:midpoint
    })
    console.log(this.state);
  }

  loadMap(domNode) {
  }

  componentDidMount() {
    this.getMidPoint();
  }

  render() {
    return (
      <DisplayCities midpoint={this.state.midpoint} />
    )
  }
}


export default MidPoint;