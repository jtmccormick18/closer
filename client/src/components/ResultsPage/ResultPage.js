//@flow
import React from "react";
import * as turf from "@turf/turf";
import FlightTable from "./Flight";
// import Hotel from './Hotel';
import * as $ from "axios";
import YourPartner from "./YourPartner";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 50
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    minWidth: 200,
  },
  pos: {
    marginBottom: 12,
  }
});

function HotelDisplay(props) {
  const { classes } = props;
  return (
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
  );
}
HotelDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};
HotelDisplay = withStyles(styles)(HotelDisplay);

function FlightCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {props.embark} to {props.dest}
        </Typography>
        <Typography variant="h6" component="h2">
          {props.airline}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Airline
        </Typography>
        <Typography variant="h6" component="h2">
          {props.flightNo}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Flight Number
        </Typography>
        <Typography variant="h6" component="h2">
          ${props.totalFare}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Total Cost
        </Typography>
      </CardContent>
    </Card>
  );
}

FlightCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
FlightCard = withStyles(styles)(FlightCard);

// const Flights = props => (
//   <div>
//     <h1>
//       {props.embark} to {props.dest}
//     </h1>
//     <p>Airline: {props.airline}</p>
//     <p>Flight Number: {props.flightNo}</p>
//     <p>Total Cost: ${props.totalFare}</p>
//   </div>
// );

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
    destCity: "",
    destAirCoordinates: [],
    departure: "",
    hasFlights: false,
    partnerAir: {},
    userAir: {},
    userTotalFare: null,
    partnerTotalFare: null,
    return: "",
    s22obj: {
      aid: 'clsrapp', // your affiliate id for tracking
      lat: '',
      lng: '',
      checkin: '',
      checkout: '', // checkin date for their stay in MM/DD/YYYY or ISO 8601 format
      maincolor: '00549E', // your brand color in hex (without the #)
      markerimage: "https://www.stay22.com/logo.png" // url of your logo or event image (in https)
    },
    settings22: {
      width: "100%", // set the width in px or %
      height: "420px" // set the height in px or %
    },
    params22: ""
  };

  setParams22 = () => {
    let date1 = this.state.departure.split('-');
    let date2 = this.state.return.split('-');
    const s22obj = {
      aid: 'clsrapp',
      checkin: `${date1[0]}${date1[1]}${date1[2]}`,
      checkout: `${date2[0]}${date2[1]}${date2[2]}`,
      lat: this.state.midpoint[1],
      lng: this.state.midpoint[0],
      maincolor: '00549E',
      markerimage: "https://www.stay22.com/logo.png"
    };
    let params22 = "";
    for (var key in s22obj) {
      if (params22) {
        params22 += '&'
      }
      params22 += `${key}=${encodeURIComponent(s22obj[key])}`;
    }
    this.setState({
      params22: `https://www.stay22.com/embed/gm?${params22}`,
      hasParams: true
    });
  }
  getFlights = (e) => {
    this.setState({
      hasDates: true
    });
    let date1 = this.state.departure.split("-");
    let date2 = this.state.return.split("-");
    let data = {
      lat: this.state.midpoint[1],
      long: this.state.midpoint[0]
    }

    $.post('/api/midpoint', data)
      .then(midpointRes => {
        const destITACode = midpointRes.data[0][0].ita;
        this.setState({
          destITACode: destITACode,
          destAirCoordinates: [midpointRes.data[0][0].lattitude, midpointRes.data[0][0].longitude],
          destCity: midpointRes.data[0][0].airport_name
        })

        if (destITACode === this.state.partner_airport || destITACode === this.state.airport)  {
          this.setParams22()
        } else {

        $.get(`https://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=${this.state.airport}&destination=${destITACode}&dateofdeparture=${date1[0]}${date1[1]}${date1[2]}&seatingclass=E&adults=1&children=0&infants=0&counter=100`)
          .then(userFlights => {
            const { onwardflights } = userFlights.data.data;

            let directFlights;
            for (let i = 0; i < onwardflights.length; i++) {
              if (onwardflights[i].destination === destITACode) {
                directFlights = onwardflights[i]
              }
            }
            const fareParsed = directFlights.fare.totalfare / 100;
            this.setState({
              userAir: directFlights,
              userTotalFare: fareParsed
            })
          })

        $.get(`https://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=${this.state.partner_airport}&destination=${destITACode}&dateofdeparture=${date1[0]}${date1[1]}${date1[2]}&seatingclass=E&adults=1&children=0&infants=0&counter=100`)
          .then(res => {
            let directFlights;
            console.log(res);
            debugger;
            for (let i = 0; i < res.data.data.onwardflights.length; i++) {
              if (res.data.data.onwardflights[i].destination === destITACode) {
                directFlights = res.data.data.onwardflights[i]
              }
            }
            const fareParsed = directFlights.fare.totalfare / 100;
            this.setState({
              partnerAir: directFlights,
              hasFlights: true,
              partnerTotalFare: fareParsed
            })
          })
          this.setParams22();
      };
  })}

  getMidPoint = () => {
    $.get(`/airports/${localStorage.clsr_id}`)
      .then(resp => {

        let userLat = parseFloat(resp.data[0][0].LAT1);
        let userLong = parseFloat(resp.data[0][0].LONG1);
        let partLat = parseFloat(resp.data[0][0].LAT2);
        let partLong = parseFloat(resp.data[0][0].LONG2);
        let point1 = turf.point([userLong, userLat]);
        let point2 = turf.point([partLong, partLat]);
        let midpoint = turf.midpoint(point1, point2);
        let date1 = this.state.departure.split('-');
        let date2 = this.state.return.split('-');

        this.setState({
          airport: resp.data[0][0].airport,
          partner_airport: resp.data[0][0].partner_airport,
          airportA: [userLat, userLong],
          airportB: [partLat, partLong],
          midpoint: midpoint.geometry.coordinates
        })
        console.log(this.state);
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
  };

  componentDidMount() {
    this.getMidPoint();
  }
  
  getUserInfo = () => {
    $.get(`/api/users/${localStorage.clsr_id}`).then(resp => {
      this.setState({
        userID: resp.data.id,
        airport1: resp.data.airport,
        airport2: resp.data.Partner.partner_airport
      });
    });
  }
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

                  <Paper id="cardDesign">
                    <Typography align="center" variant="h6" gutterBottom>
                      Your Hotel:
                    <br />
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
              <Grid item position="center" xs={10} sm={10} md={10}>
                {this.state.hasFlights ? (
                  <div>
                    <Paper id="cardDesign">
                      <Typography align="center" variant="h6" gutterBottom>
                        Your Flight Options:
                      <hr />
                      </Typography>
                      <div className="flightCards">
                        <Grid container spacing={24}>
                          <Grid item xs={12} sm={6} md={6}>
                            <Typography align="center" variant="subheading" gutterBottom>
                              Your Flight Info
                            </Typography>
                            <FlightCard embark={this.state.userAir.origin} dest={this.state.userAir.destination} flightNo={this.state.userAir.flightno} airline={this.state.userAir.airline} totalFare={this.state.userTotalFare} />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Typography align="center" variant="subheading" gutterBottom>
                              Partner Flight Info
                            </Typography>
                            <FlightCard embark={this.state.partnerAir.origin} dest={this.state.partnerAir.destination} flightNo={this.state.partnerAir.flightno} airline={this.state.partnerAir.airline} totalFare={this.state.partnerTotalFare} />
                          </Grid>
                        </Grid>
                      </div>
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
}
ResultPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResultPage);
