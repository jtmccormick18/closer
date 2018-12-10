import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import * as $ from "axios";
import Modal from "@material-ui/core/Modal";
import PartnerUpdate from "../PartnerUpdate";

const styles = {
  card: {
    minWidth: 275,
    width: 275,
    margin: 30
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.cardTitle}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.partnerName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.cardSubTitle}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.partnerAirport}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.open}>
          {props.buttonName}
        </Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

SimpleCard = withStyles(styles)(SimpleCard);


const ModalStyles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class YourPartner extends React.Component {
  state = {
    partnerName: "",
    partnerAirport: "",
    open: false
  };
  componentDidMount() {
    $.get(`/api/partners/${localStorage.clsr_id}`).then(res => {
      console.log(res);
      this.setState({
        partnerName: res.data.name,
        partnerAirport: res.data.partner_airport
      });
    });
  }
  handleOpen = () => {
    this.setState({ open: true });
    console.log(this.state)
  };
  handleClose = () => {
    this.setState({ open: false });
    console.log(this.state)
  };
  childHandler= (ChildState) =>{
      console.log("function is happening")
    this.setState({
      partnerName: ChildState.name,
      partnerAirport: ChildState.airport
    })
    console.log("YourPartner State Updated")
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <SimpleCard
          partnerName={`${localStorage.clsr_username}`}
          partnerAirport={`${localStorage.clsr_airport}`}
          cardTitle={"Currently Logged in As:"}
          buttonName={"logout"}
          cardSubTitle={"Your Airport"}
        />

        <SimpleCard
          partnerName={this.state.partnerName}
          partnerAirport={this.state.partnerAirport}
          cardTitle={"Your Partner"}
          buttonName={"update"}
          cardSubTitle={"Their Airport"}
          open={this.handleOpen}
        />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
        
        <PartnerUpdate onClose={this.handleClose} action={this.childHandler}/>
        
         
          
        </Modal>
      </div>
    );
  }
}
YourPartner.propTypes = {
    classes: PropTypes.object.isRequired,
  }; 

YourPartner = withStyles(ModalStyles)(YourPartner);

export default YourPartner;
