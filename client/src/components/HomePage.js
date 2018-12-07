import React from "react";

class HomePage extends React.Component {
    state = {
    };

    render() {
        return (
            <div>
                <iframe title="homeVid" width="560" height="315" src="https://www.youtube.com/embed/PT2_F-1esPk?autoplay=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        )
    }
}

export default HomePage;