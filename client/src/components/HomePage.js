
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "typeface-roboto";
import { Zoom } from "react-slideshow-image";
import { SocialIcon } from "react-social-icons";

const images = [
  "https://apis.xogrp.com/media-api/images/19a8d720-a157-4058-ad4e-bf45e3f31ede",
  "http://medicarepharmabusiness.com/wp-content/uploads/2018/01/08-Marriage-Advice-7-Relationship-Tips-to-Get-the-Love-You-Want-1024x683.jpg",
  "https://mindbodygreen-res.cloudinary.com/image/upload/w_767,q_auto:eco,f_auto,fl_lossy/org/stocksy_txp084cf2abdub100_small_1161733.jpg",
  "https://image.freepik.com/free-photo/lesbian-couple-dating-in-a-park_53876-46900.jpg"
];

const zoomOutProperties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: false
};

const styles = {
  card: {
    maxWidth: 845,
    marginTop: 25
  },
  media: {
    height: 440,
    overflow: "hidden"
  },
  social: {
    marginRight: 12
  }
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Grid container justify="center">
      <Card className={classes.card}>
        <CardMedia className={classes.media}>
          <Zoom {...zoomOutProperties}>
            {images.map((each, index) => (
              <img key={index} style={{ width: "100%" }} src={each} />
            ))}
          </Zoom>
        </CardMedia>
        <CardContent>
        <Grid container justify="center">
          <Typography gutterBottom variant="h5" component="h2">
          CLSR
          </Typography>
          </Grid>
        <Grid container justify="center">
          <Typography gutterBottom variant="h5" component="h2">
            Couples, Lovers, Significant Others, Relationships
          </Typography>
          </Grid>
          <Typography component="p">
            CLSR is a one-of-a kind application where users involved in long
            distance relationships can connect with their significant others in
            an easy, cheap, friendly ans convenient way! New Users click on
            Register and current Users click on login.
            <hr />
          </Typography>
          <Grid container justify="center">
            <Typography gutterBottom variant="h5" component="h2">
              Follow Us On Social Media{" "}
            </Typography>
            </Grid>
            <Grid container justify="center">
            <SocialIcon className={classes.social} url="http://twitter.com" />
            <SocialIcon className={classes.social} url="http://facebook.com" />
            <SocialIcon className={classes.social} url="http://instagram.com" />
            <SocialIcon className={classes.social} url="http://linkedin.com" />
            <SocialIcon
              className={classes.social}
              url="https://github.com/jtmccormick18/closer"
            />
         </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
