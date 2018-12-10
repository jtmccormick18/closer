import React from "react";
import { Redirect, Route } from "react-router-dom";
import Axios from 'axios';

class PrivateRoute extends React.Component {
    state = {
        validToken: null
    }

    checkAuth = () => {
        Axios.get('/check', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                this.setState({
                    validToken: true
                });
            }).catch(err => {
                this.setState({
                    validToken: false
                });
            })
    }
    componentDidMount = () => {
        this.checkAuth();
    };

    render() {
        const { component: Component, ...rest } = this.props;
        console.log(this.state.validToken, "in private route");
        return (
            this.state.validToken !== null && <Route {...rest} render={props => this.state.validToken ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }} />
                )}
            />
        );
    }
}



export default PrivateRoute;