// // @flow
// import * as turf from '@turf/turf';
// import React, { Component, Fragment } from 'react';
// import * as $ from 'axios';
// // import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// // import L from 'leaflet';
// // import nearbyCities from 'nearby-cities';



// // const MyPopupMarker = (props) => (
// //   <Marker position={props.position}>
// //     <Popup>{props.content}</Popup>
// //   </Marker>
// // )
// {/* <Map center={this.state.markers[2].position} zoom={13}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//         />
//         <MyMarkersList markers={this.state.markers} />
//       </Map> */}

// // const MyMarkersList = (props) => {
// //   const items=props.markers.map(i => (
// //     <MyPopupMarker key={i.key} position={i.position} content={i.content} />
// //   ))
// //   return <Fragment>{items}</Fragment>
// // }
// const DisplayCities = (props) => (
//   <div>
//     <p>Long: {props.long}</p>
//     <p>Lat: {props.lat}</p>
//   </div>
// )

// class MidPoint extends React.Component {
//   state = {
//     pointA:[],
//     pointB:[],
//     midpoint: [],
//     nearbyCities: []
//   };

//   handleChange = e => {
//     e.preventDefault();
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };
//   getMidPoint = () => {
//     $.get(`/airports/${localStorage.clsr_id}`)
//       .then(resp => {
//         console.log(resp);
//         let userLat=parseFloat(resp.data[0][0].LAT1);
//         let userLong=parseFloat(resp.data[0][0].LONG1)
//         let partLat=parseFloat(resp.data[0][0].LAT2);
//         let partLong=parseFloat(resp.data[0][0].LONG2)
//         let point1 = turf.point([userLat, userLong]);
//         let point2 = turf.point([partLat, partLong]);
//         let midpoint = turf.midpoint(point1, point2);
//         this.setState({
//           pointA:[userLat,userLong],
//           pointB:[partLat,partLong],
//           midpoint: midpoint.geometry.coordinates
//         })
//         console.log(this.state);
//       })
//   }

//   loadMap(domNode) {
//   }

//   componentDidMount() {
//     this.getMidPoint();
//   }

//   render() {
//     return (
//       <DisplayCities long={this.state.midpoint[1]} lat={this.state.midpoint[0]} />
//     )
//   }
// }


// export default MidPoint;