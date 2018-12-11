import React from "react";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const Error=() => (
    <div align="center">
        <Paper id="errorCard">
        <Typography align="center" variant="h4" gutterBottom>
                    Uh oh, looks like you lost your way
                    <br />
                  </Typography>
        <img src= "https://media.giphy.com/media/zo5k8p5YbogY8/giphy.gif"/>
        <Typography align="center" variant="h6" gutterBottom>
                    Click o the CLSR logo in the lop left to redirect back to the home page. 
                    <br />
                  </Typography>


        </Paper>
    </div>
);

class ErrorPage extends React.Component {
    state = {
    };

    render() {
        return (
            <Error
            />
        )
    }
}

export default ErrorPage;