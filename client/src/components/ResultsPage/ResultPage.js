//@flow
import React from "react";
import * as turf from '@turf/turf';
import FlightTable from './Flight';
import * as $ from 'axios';

class ResultPage extends React.Component {
    state = {
        hasDates:false,
        airport:'',
        partner_airport:'',
        airportA: [],
        airportB: [],
        midpoint: [],
        departure:'',
        arrival:''
    };
    getMidPoint = () => {
        $.get(`/airports/${localStorage.clsr_id}`)
            .then(resp => {
                console.log(resp);
                let userLat = parseFloat(resp.data[0][0].LAT1);
                let userLong = parseFloat(resp.data[0][0].LONG1)
                let partLat = parseFloat(resp.data[0][0].LAT2);
                let partLong = parseFloat(resp.data[0][0].LONG2)
                let point1 = turf.point([userLat, userLong]);
                let point2 = turf.point([partLat, partLong]);
                let midpoint = turf.midpoint(point1, point2);
                this.setState({
                    airport:resp.data[0][0].airport,
                    partner_airport:resp.data[0][0].partner_airport,
                    airportA: [userLat, userLong],
                    airportB: [partLat, partLong],
                    midpoint: midpoint.geometry.coordinates
                })
                console.log(this.state);
            })
    }
    getUserInfo=()=>{
        $.get(`/api/users/${localStorage.clsr_id}`)
        .then(resp => {
            console.log(resp.data)
            this.setState({
                userID: resp.data.id,
                airport1: resp.data.airport,
                airport2: resp.data.Partner.partner_airport
            })
        })
    }
    getFlights = (e) => {
        this.setState({
            hasDates:true
        })
        let date1=this.state.departure.split('-');
        let date2=this.state.arrival.split('-');
        $.get(`http://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=${this.state.airport}&destination=${this.state.partner_airport}&dateofdeparture=${date1[0]}${date1[1]}${date1[2]}&dateofarrival=${date2[0]}${date2[1]}${date2[2]}&seatingclass=E&adults=1&children=0&infants=0&counter=100`)
            .then(res => {
                console.log(res);
            }).catch(err => {
                alert('error');
            })
    }
    getDate=(e)=>{
        e.preventDefault();
    }
    componentDidMount() {
        this.getMidPoint();
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
                (<FlightTable handleChange={this.handleChange} dVal={this.state.embarkDateA} aVal={this.state.arrivalDateA} handleSubmit={this.getFlights} />) 
                :
            (<div>
                <p>Results Go here</p>
                <br />
                <p>Midpoint/Stay 22 Component<ul><li>- Shows a map</li><li>- Shows the city that is the midpoint</li></ul></p>
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