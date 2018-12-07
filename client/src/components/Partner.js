import React from "react";
import * as $ from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Airport from "./Airport";

const PartnerForm = props => (
  <Grid container justify="center">
    <form className="createAccountForm">
      <Typography align="center" variant="h4" color="inherit">
        Add Your Buddy
      </Typography>
      <hr />
      <MenuItem>
        <span className="menuLabel">Name:</span>
        <input
          className="menuitem"
          type="text"
          name="name"
          value={props.nameVal}
          onChange={props.handleChange}
        />
      </MenuItem>
      <Airport onChange={props.handleChange} currAirport={props.airVal} />
      <div className="buttonbox">
        <Button align="center" type="submit" onClick={props.submitPartner}>
          Add Buddy
        </Button>
      </div>
    </form>
  </Grid>
);

class PartnerCreate extends React.Component {
  state = {
    name: "",
    airport: ""
  };

  handleChange = (e, values) => {
    values = e.target.name ? e.target : values;
    const { name, value } = values;
    this.setState({
      [name]: value
    });
  };

  createPartner = e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      partner_airport: this.state.airport
    };
    console.log(userData);
    $.post("/api/partners", userData)
      .then(resp => {
        console.log(resp);
        alert("Thanks for Creating an account, Please Login to continue.");
      })
      .catch(err => {
        alert("Fill out the entire form!");
      });
  };

  render() {
    return (
      <div>
        <PartnerForm
          handleChange={this.handleChange}
          nameVal={this.state.name}
          airVal={this.state.airport}
          submitPartner={this.createPartner}
        />
      </div>
    );
  }
}

export default PartnerCreate;
