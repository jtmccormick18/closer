import React from 'react';
import * as $ from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



// Need to pass in source airport, destination and date of departure
const FlightTable = (props) => (
    <Grid container justify="center">
        <form className="createAccountForm">
            <Typography align="center" variant="h4" color="inherit">
                Enter Departure and Arrival Date
</Typography>
            <hr />
            <MenuItem>
                Departure Date:
        <input
                    type="date"
                    name="departure"
                    value={props.dVal}
                    onChange={props.handleChange}
                />
            </MenuItem>
            <MenuItem>
                Arrival Date:
        <input
                    type="date"
                    name="arrival"
                    value={props.aVal}
                    onChange={props.handleChange}
                />
            </MenuItem>
            <Button aligntItem="center" type="submit" onClick={props.handleChange}>
                Submit
    </Button>
        </form>
    </Grid>
);



class Flight extends React.Component {
    state = {
        flights: [],
        userID: '',
        airport1: '',
        airport2: '',
        departuredate: '',
        arrivaldate: ''
    }
    getUserInfo = () => {
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
    getFlights = () => {
        $.get(`http://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=${this.state.airport1}&destination=${this.state.airport2}&dateofdeparture=${this.state.departuredate}&dateofarrival=${this.state.arrivaldate}&seatingclass=E&adults=1&children=0&infants=0&counter=100`)
            .then(res => {
                console.log(res);
            }).catch(err => {
                alert('error');
            })
    }

    componentDidMount() {
        this.getUserInfo();
        this.getFlights();
    }
    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        return (<div>
            <FlightTable
                handleChange={this.handleChange}
                dVal={this.state.departure}
                aVal={this.state.arrival}
            />
        </div>
        );
    }
}



export default Flight;