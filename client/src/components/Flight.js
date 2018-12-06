import React from 'react';
import * as $ from 'axios';

// Need to pass in source airport, destination and date of departure
const FlightTable = (props) => (
<div></div>
);



class Flight extends React.Component {
    state = {
        flights: []
    }
    getFlights = () => {
        $.get(`/api/users/${localStorage.clsr_id}`)
            .then(function (res) {
                console.log(res);
                $.get(`http://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=JFK&destination=ATL&dateofdeparture=20181219&dateofarrival=20181220&seatingclass=E&adults=1&children=0&infants=0&counter=100`)
            }).then(function (res) {
                console.log(res);
            })
        }

        componentDidMount() {
            this.getFlights();
        }
    render() {
        return (<div>

        </div>
        );
    }
}


export default Flight;