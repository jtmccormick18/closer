import React from "react";

const Error=() => (
    <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/DlmtbHw1mtA?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    
        <h1>404!: BOY IF YOU DON'T GET BACK TO THE MAIN PAGE</h1>
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