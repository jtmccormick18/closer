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
        Update your Buddy
      </Typography>
      <hr />
      {props.isUpdated && <Typography align="center" variant="p" color="error">Updated! Click close to continue</Typography>}
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
          Update
        </Button>
        <Button align="center" type="submit" onClick={props.closeModal}>
          close
        </Button>

      </div>
    </form>
  </Grid>
);

class PartnerUpdate extends React.Component {
  state = {
    name: "",
    airport: "",
    isUpdated: false,
    isNotRight: false
  };

  handleChange = (e, values) => {
    values = e.target.name ? e.target : values;
    const { name, value } = values;
    this.setState({
      [name]: value
    });
  };
  
    updatePartner = e => {
    e.preventDefault();
    const userData = {
  
      name: this.state.name,
      partner_airport: this.state.airport
    };
    if (!this.state.name || !this.state.airport){
      this.setState({isNotRight:true})
    } else {

      $.put(`/api/partners/${localStorage.clsr_id}`, userData)
        .then(resp => {
          console.log(this.state);
          this.props.action({
            name: this.state.name,
            airport: this.state.airport
          })
          this.setState({
            isUpdated: true,
            isNotRight: false
          });
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
          submitPartner={this.updatePartner}
          closeModal={this.props.onClose}
          isUpdated={this.state.isUpdated}
          isNotRight={this.state.isNotRight}
        />
      </div>
    );
  }
}

export default PartnerUpdate;
