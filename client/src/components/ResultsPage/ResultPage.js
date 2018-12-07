//@flow
import React from "react";
import turf from '@turf/turf';
import * as $ from 'axios';

class ResultPage extends React.Component {
    state = {
        airportA: [],
        airportB: [],
        midpoint: []
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
                    airportA: [userLat, userLong],
                    airportB: [partLat, partLong],
                    midpoint: midpoint.geometry.coordinates
                })
                console.log(this.state);
            })
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
        )
    }
}

export default ResultPage;