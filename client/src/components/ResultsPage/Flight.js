import React from 'react';
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
            <MenuItem >
                <span className="menuitem">
                When would you like to leave?
                </span> 
                <input
                    className="menuitem"
                    type="date"
                    name="departure"
                    value={props.dVal}
                    onChange={props.handleChange}
                />
            </MenuItem>
            <MenuItem >
            <span className="menuitem">
                When do you plan to come home?   
            </span>
                <input
                    className="menuitem"
                    type="date"
                    name="return"
                    value={props.aVal}
                    onChange={props.handleChange}
                />
            </MenuItem>
            <Button type="submit" onClick={props.handleSubmit}>
                Submit
            </Button>
        </form>
    </Grid>
)
export default FlightTable