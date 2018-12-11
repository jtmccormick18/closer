//@flow
import React from "react";
import * as turf from "@turf/turf";
import FlightTable from "./Flight";
// import Hotel from './Hotel';
import * as $ from "axios";
import YourPartner from "./YourPartner";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

<<<<<<< Updated upstream
const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 50
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

function HotelDisplay(props) {
  const { classes } = props;
  return (
=======
const HotelDisplay = (props) => (
    <div>
        <iframe title="hotelMap" id="stay22-widget" width={props.width} height={props.height} src={props.src} frameBorder="0" allowFullScreen></iframe>
    </div>
)
const Flights = (props) => (
>>>>>>> Stashed changes
    <div>
      <iframe
        className={classes.paper}
        title="hotelMap"
        id="stay22-widget"
        width="90%"
        height={props.height}
        src={props.src}
        frameBorder="0"
        allowFullScreen
      />
    </div>
<<<<<<< Updated upstream
  );
}
HotelDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};
HotelDisplay = withStyles(styles)(HotelDisplay);

const Flights = props => (
  <div>
    <h1>
      {props.embark} to {props.dest}
    </h1>
    <p>Airline: {props.airline}</p>
    <p>Flight Number: {props.flightNo}</p>
  </div>
);

class ResultPage extends React.Component {
  state = {
    hasDates: false,
    param: "",
    airport: "",
    partner_airport: "",
    userFlights: [],
    partnerFlights: [],
    airportA: [],
    airportB: [],
    midpoint: [],
    destITACode: "",
    destAirCoordinates: [],
    departure: "",
    hasFlights: false,
    partnerAir: {},
    userAir: {},
    return: "",
    s22obj: {
      aid: "clsrapp", // your affiliate id for tracking
      lat: "",
      lng: "",
      // address: 'chicago', // full street address or venue name + city
      checkin: "2019-04-22",
      checkout: "2019-04-28", // checkin date for their stay in MM/DD/YYYY or ISO 8601 format
      maincolor: "00549E", // your brand color in hex (without the #)
      markerimage: "https://www.stay22.com/logo.png" // url of your logo or event image (in https)
    },
    settings22: {
      width: "100%", // set the width in px or %
      height: "420px" // set the height in px or %
    },
    params22: ""
  };
  componentDidMount = () => {};
  getFlights = e => {
    this.setState({
      hasDates: true
    });
    this.getMidPoint();
    let date1 = this.state.departure.split("-");
    let date2 = this.state.return.split("-");
    let data = {
      lat: this.state.midpoint[0],
      long: this.state.midpoint[1]
    };
    $.post("/api/midpoint", data)
      .then(resp => {
        this.setState({
          destITACode: resp.data[0][0].ita,
          destAirCoordinates: [
            resp.data[0][0].lattitude,
            resp.data[0][0].longitude
          ]
        });
      })
      .then(resp => {
        $.get(
          `http://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=${
            this.state.airport
          }&destination=${this.state.destITACode}&dateofdeparture=${date1[0]}${
            date1[1]
          }${date1[2]}&dateofarrival=${date1[0]}${date1[1]}${
            date1[2]
          }&seatingclass=E&adults=1&children=0&infants=0&counter=100`
        ).then(res => {
          // let flightIndex;
          // let cheapestFare=res.data.data.onwardflights[0].fare.adulttotalfare;
          // for (let i=0;i<res.data.data.onwardflights.length;i++){
          //     if (cheapestFare>res.data.data.onwardflights[i].fare.adulttotalfare){
          //         cheapestFare=res.data.data.onwardflights[i].fare.adulttotalfare
          //         flightIndex=res.data.data.onwardflights[i]
          //     }
          // }
          // this.setState({
          //     userAir: flightIndex
          // })
        });
      })
      .then(resp => {
        $.get(
          `http://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=${
            this.state.partner_airport
          }&destination=${this.state.destITACode}&dateofdeparture=${date1[0]}${
            date1[1]
          }${date1[2]}&seatingclass=E&adults=1&children=0&infants=0&counter=100`
        ).then(res => {
          // let flightIndex;
          // let cheapestFare=res.data.data.onwardflights[0].fare.adulttotalfare;
          // for (let i=0;i<res.data.data.onwardflights.length;i++){
          //     if (cheapestFare>res.data.data.onwardflights[i].fare.adulttotalfare){
          //         cheapestFare=res.data.data.onwardflights[i].fare.adulttotalfare
          //         flightIndex=res.data.data.onwardflights[i]
          //     }
          // }
          // this.setState({
          //     partnerAir: flightIndex
          // })
        });
      })
      .then(res => {
        this.setState({
          hasFlights: true
        });
      });
  };
  getMidPoint = () => {
    $.get(`/airports/${localStorage.clsr_id}`)
      .then(resp => {
        let userLat = parseFloat(resp.data[0][0].LAT1);
        let userLong = parseFloat(resp.data[0][0].LONG1);
        let partLat = parseFloat(resp.data[0][0].LAT2);
        let partLong = parseFloat(resp.data[0][0].LONG2);
        let point1 = turf.point([userLat, userLong]);
        let point2 = turf.point([partLat, partLong]);
        let midpoint = turf.midpoint(point1, point2);
        let date1 = this.state.departure.split("-");
        let date2 = this.state.return.split("-");
        this.setState({
          airport: resp.data[0][0].airport,
          partner_airport: resp.data[0][0].partner_airport,
          airportA: [userLat, userLong],
          airportB: [partLat, partLong],
          midpoint: midpoint.geometry.coordinates,
          s22obj: {
            aid: "clsrapp",
            checkin: `${date1[0]}${date1[1]}${date1[2]}`,
            checkout: `${date2[0]}${date2[1]}${date2[2]}`,
            lat: midpoint.geometry.coordinates[0],
            lng: midpoint.geometry.coordinates[1],
            maincolor: "00549E",
            markerimage: "https://www.stay22.com/logo.png"
          }
        });
      })
      .then(resp => {
        for (var key in this.state.s22obj) {
          if (this.state.params22) {
            this.setState({
              params22: (this.state.params22 += "&")
            });
          }
          this.setState({
            params22: (this.state.params22 +=
              key + "=" + encodeURIComponent(this.state.s22obj[key]))
          });
        }
=======
)

class ResultPage extends React.Component {
    state = {
        hasDates: false,
        param: '',
        airport: '',
        partner_airport: '',
        userFlights: [],
        partnerFlights: [],
        airportA: [],
        airportB: [],
        midpoint: [],
        destITACode: '',
        destCity: '',
        destAirCoordinates: [],
        departure: '',
        hasFlights: false,
        partnerAir: {},
        userAir: {},
        return: '',
        s22obj: {
            aid: 'clsrapp', // your affiliate id for tracking
            lat: '',
            lng: '',
            // address: 'chicago', // full street address or venue name + city
            checkin: '2019-04-22',
            checkout: '2019-04-28', // checkin date for their stay in MM/DD/YYYY or ISO 8601 format
            maincolor: '00549E', // your brand color in hex (without the #)
            markerimage: "https://www.stay22.com/logo.png" // url of your logo or event image (in https)
        },
        settings22: {
            width: '100%', // set the width in px or %
            height: '420px' // set the height in px or %
        },
        params22: ''

    };
    getFlights = (e) => {
        this.setState({
            hasDates: true,
        })
        let date1 = this.state.departure.split('-');
        let date2 = this.state.return.split('-');
        let data = {
            lat: this.state.midpoint[0],
            long: this.state.midpoint[1]
        }
        $.post('/api/midpoint', data)
            .then(resp => {
                this.setState({
                    destITACode: resp.data[0][0].ita,
                    destAirCoordinates: [resp.data[0][0].lattitude, resp.data[0][0].longitude],
                    destCity: resp.data[0][0].airport_name
                })
            })
            .then(resp => {
                $.get(`http://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=${this.state.airport}&destination=${this.state.destITACode}&dateofdeparture=${date1[0]}${date1[1]}${date1[2]}&seatingclass=E&adults=1&children=0&infants=0&counter=100`)
                    .then(res => {
                        let directFlights = {};
                        let cheapestFare = res.data.data.onwardflights[0].fare.adulttotalfare;
                        for (let i = 0; i < res.data.data.onwardflights.length; i++) {
                            if (res.data.data.onwardflights[i].destination === this.state.destITACode
                                && res.data.onwardflights[i].fare.adulttotalfare < cheapestFare) {
                                cheapestFare = res.data.data.onwardflights[i].fare.adulttotalfare;
                                directFlights = res.data.data.onwardflights[i]
                            }
                        }
                        this.setState({
                            userAir: directFlights
                        })
                    })
            })
            .then(resp => {
                $.get(`http://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=${this.state.partner_airport}&destination=${this.state.destITACode}&dateofdeparture=${date1[0]}${date1[1]}${date1[2]}&seatingclass=E&adults=1&children=0&infants=0&counter=100`)
                    .then(res => {
                        let directFlights = {};
                        let cheapestFare = res.data.data.onwardflights[0].fare.adulttotalfare;
                        for (let i = 0; i < res.data.data.onwardflights.length; i++) {
                            if (res.data.data.onwardflights[i].destination === this.state.destITACode
                                && res.data.onwardflights[i].fare.adulttotalfare < cheapestFare) {
                                cheapestFare = res.data.data.onwardflights[i].fare.adulttotalfare;
                                directFlights = res.data.data.onwardflights[i]
                            }
                        }
                        this.setState({
                            partnerAir: directFlights
                        })
                    })
            })
            .then(res => {
                this.setState({
                    hasFlights: true
                })
            })
    }

    getMidPoint = () => {
        $.get(`/airports/${localStorage.clsr_id}`)
            .then(resp => {
                let userLat = parseFloat(resp.data[0][0].LAT1);
                let userLong = parseFloat(resp.data[0][0].LONG1)
                let partLat = parseFloat(resp.data[0][0].LAT2);
                let partLong = parseFloat(resp.data[0][0].LONG2)
                let point1 = turf.point([userLat, userLong]);
                let point2 = turf.point([partLat, partLong]);
                let midpoint = turf.midpoint(point1, point2);
                let date1 = this.state.departure.split('-');
                console.log(date1);
                let date2 = this.state.return.split('-');
                this.setState({
                    airport: resp.data[0][0].airport,
                    partner_airport: resp.data[0][0].partner_airport,
                    airportA: [userLat, userLong],
                    airportB: [partLat, partLong],
                    midpoint: midpoint.geometry.coordinates,
                    s22obj: {
                        aid: 'clsrapp',
                        checkin: `${date1[0]}${date1[1]}${date1[2]}`,
                        checkout: `${date2[0]}${date2[1]}${date2[2]}`,
                        lat: midpoint.geometry.coordinates[0],
                        lng: midpoint.geometry.coordinates[1],
                        maincolor: '00549E',
                        markerimage: "https://www.stay22.com/logo.png"
                    }
                })
            })
            .then(resp => {
                for (var key in this.state.s22obj) {
                    if (this.state.params22) {
                        this.setState({
                            params22: this.state.params22 += '&'
                        })
                    }
                    this.setState({
                        params22: this.state.params22 += key + '=' + encodeURIComponent(this.state.s22obj[key])
                    })
                }
                this.setState({
                    params22: `https://www.stay22.com/embed/gm?` + this.state.params22
                });
            })
    }
    getUserInfo = () => {
        $.get(`/api/users/${localStorage.clsr_id}`)
            .then(resp => {
                this.setState({
                    userID: resp.data.id,
                    airport1: resp.data.airport,
                    airport2: resp.data.Partner.partner_airport
                })
            })
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    handleChange = e => {
        e.preventDefault();
>>>>>>> Stashed changes
        this.setState({
          params22: `https://www.stay22.com/embed/gm?` + this.state.params22
        });
        console.log(this.state);
      });
  };
  getUserInfo = () => {
    $.get(`/api/users/${localStorage.clsr_id}`).then(resp => {
      this.setState({
        userID: resp.data.id,
        airport1: resp.data.airport,
        airport2: resp.data.Partner.partner_airport
      });
    });
  };
  componentWillMount() {
    this.getMidPoint();
  }
  componentDidMount() {}
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updatePartner = e => {
    e.preventDefualt();
  };

  render() {
    return (
      <div>
        {!this.state.hasDates ? (
          <FlightTable
            handleChange={this.handleChange}
            dVal={this.state.departure}
            aVal={this.state.return}
            handleSubmit={this.getFlights}
          />
        ) : (
          <Grid container spacing={12}>
            <Grid item xs={1}>
              <div />
            </Grid>
            <Grid item xs={11} sm={5} md={3}>
              <YourPartner />
            </Grid>
            <Grid item align="center" xs={12} sm={5} md={7}>
              <div>
                <br />

<<<<<<< Updated upstream
                <Paper id="cardDesign">
                  <Typography align="center" variant="h6" gutterBottom>
                    Your Hotel:
                    <br/>
                  </Typography>
                  <HotelDisplay
                    width={this.state.settings22.width}
                    height={this.state.settings22.height}
                    src={this.state.params22}
                  />
                </Paper>
                <br />
              </div>
            </Grid>
            <Grid item xs={1}>
              <div />
            </Grid>
            <Grid item xs={1}>
              <div />
            </Grid>
            <Grid item position="center"  xs={10} sm={10} md={10}>
              {this.state.hasFlights ? (
                <div>
                  <Paper id="cardDesign">
                    <Typography align="center" variant="h6" gutterBottom>
                      Your Flight Options:
                      <hr />
                    </Typography>
                    <Flights
                      embark={this.state.userAir.origin}
                      dest={this.state.userAir.destination}
                      airline={this.state.userAir.airline}
                      flightNo={this.state.userAir.flightno}
                    />
                    <Flights
                      embark={this.state.partnerAir.origin}
                      dest={this.state.partnerAir.destination}
                      airline={this.state.partnerAir.airline}
                      flightNo={this.state.partnerAir.flightno}
                    />
                  </Paper>
                </div>
              ) : (
                <div />
              )}
              <br />
            </Grid>
            <Grid item xs={1} sm={1} md={1} />
            <Grid item xs={12} sm={6} md={6} />
          </Grid>
        )}
      </div>
    );
  }
=======
    render() {
        return (
            <div>
                {!this.state.hasDates ?
                    (<FlightTable handleChange={this.handleChange} dVal={this.state.departure} aVal={this.state.return} handleSubmit={this.getFlights} />)
                    :
                    (<div>
                        <p>Results Go here</p>
                        <br />
                        <div>
                            <HotelDisplay width={this.state.settings22.width} height={this.state.settings22.height} src={this.state.params22} />
                        </div>
                        <br />
                        {this.state.hasFlights ? (<div><Flights embark={this.state.userAir.origin} dest={this.state.userAir.destination} airline={this.state.userAir.airline}
                            flightNo={this.state.userAir.flightno} />
                            <Flights embark={this.state.partnerAir.origin} dest={this.state.partnerAir.destination} airline={this.state.partnerAir.airline}
                                flightNo={this.state.partnerAir.flightno} /></div>) : (<div />)}
                        <br />
                        <p>Hotel Component</p>
                        <br />
                        <p>Total Cost Component</p>
                    </div>
                    )}
            </div>
        )
    }
>>>>>>> Stashed changes
}
ResultPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResultPage);
