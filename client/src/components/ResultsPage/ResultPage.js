//@flow
import React from "react";
import * as turf from '@turf/turf';
import FlightTable from './Flight';
// import Hotel from './Hotel';
import * as $ from 'axios';

const HotelDisplay = (props) => (
    <div>
        <iframe title="hotelMap" id="stay22-widget" width={props.width} height={props.height} src={props.src} frameBorder="0" allowFullScreen></iframe>
    </div>
)

class ResultPage extends React.Component {
    state = {
        hasDates: false,
        param: '',
        airport: '',
        partner_airport: '',
        userFlights:[],
        partnerFlights:[],
        airportA: [],
        airportB: [],
        midpoint: [],
        midpointCity:'',
        departure: '',
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
    componentDidMount = () => {
        
    };
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
                console.log(this.state)
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
                console.log(this.state)
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
    getFlights = (e) => {
        this.setState({
            hasDates: true,
        })
        this.getMidPoint();
        let date1 = this.state.departure.split('-');
        let date2 = this.state.return.split('-');
        $.get(`http://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=${this.state.airport}&destination=${this.state.partner_airport}&dateofdeparture=${date1[0]}${date1[1]}${date1[2]}&dateofarrival=${date1[0]}${date1[1]}${date1[2]}&seatingclass=E&adults=1&children=0&infants=0&counter=100`)
            .then(res => {
                console.log(res);
            }).catch(err => {
                alert('error');
            })
        console.log(this.state)
    }
    componentDidMount() {
        // this.getMidPoint();
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

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
                        <p>Airfare Component</p>
                        <br />
                        <p>Hotel Component</p>
                        <br />
                        <p>Total Cost Component</p>
                    </div>
                    )}
            </div>
        )
    }
}

export default ResultPage;