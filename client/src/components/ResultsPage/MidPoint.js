// @flow
import turf from '@turf/midpoint';
import React, { Component,Fragment } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MyPopupMarker = (props) => (
  <Marker position={props.position}>
    <Popup>{props.content}</Popup>
  </Marker>
)

const MyMarkersList = (props) => {
  const items=props.markers.map(i => (
    <MyPopupMarker key={i.key} position={i.position} content={i.content} />
  ))
  return <Fragment>{items}</Fragment>
}


class MidPoint extends React.Component {
  state = {
    markers: [
      { key: 'marker1', position: [51.5, -0.1], content: 'My first popup' },
      { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
      { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' }
    ]
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getMidPoint = e => {
    e.preventDefault();
    let point1 = turf.point(this.state.markers[0].position);
    let point2 = turf.point(this.state.markers[1].position)
    let midpoint = turf.midpoint(point1, point2);
    // this.setState({
    //   markers: [
    //     { key: 'Departing', position: point1, content: 'Your Airport' },
    //     { key: 'Departing', position: point2, content: 'Partner Airport' },
    //     { key: 'Mid-Point', position: midpoint, content: 'Ideal Meeting Spot' }
    //   ]
    // })
  }

  loadMap(domNode) {
  }

  componentDidMount() {

  }

  render() {
    return (
      <Map center={this.state.markers[2].position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <MyMarkersList markers={this.state.markers} />
      </Map>
    )
  }
}


export default MidPoint;