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
      {props.isNotRight && <Typography align="center" variant="p" color="error">Uh Oh! Please make sure you fill out all the forms</Typography>}

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
    airport: "",
    isNotRight: false
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
    if (!this.state.name || !this.state.airport){
      this.setState({isNotRight:true})
    } else {
    $.post(`/api/partners/${localStorage.clsr_id}`, userData)
      .then(resp => {
        window.location.replace('/results');
      })
      .catch(err => {
      });
    }

  };

  render() {
    return (
      <div>
        <PartnerForm
          handleChange={this.handleChange}
          nameVal={this.state.name}
          airVal={this.state.airport}
          submitPartner={this.createPartner}
          isNotRight={this.state.isNotRight}
        />
      </div>
    );
  }
}

export default PartnerCreate;
