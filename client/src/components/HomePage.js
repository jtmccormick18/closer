import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import 'typeface-roboto';

const styles = {
    card: {
        maxWidth: 845,
        marginTop: 25,
        // margin: 0,
        // margin: 'auto',


    },

    media: {
        height: 340,
    },
};

function MediaCard(props) {
    const { classes } = props;
    return (
        <Grid container justify="center">
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://apis.xogrp.com/media-api/images/19a8d720-a157-4058-ad4e-bf45e3f31ede"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            CLSR: Couples, Lovers, Significant Others, Relationships
          </Typography>
                        <Typography component="p">
                            CLSR is a one-of-a kind application where users involved in long distance relationships can connect with their significant others in an easy,
                            cheap, friendly ans convenient way! New Users click on Register and current Users click on login.
          </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
