import React from 'react';

const Background = (props) => (
<div>
   <body backgroundImage={props.BackgroundImage}></body>
</div>

);

class BackgroundFade extends React.Component {

    state = {
    background: "assets/fancy-cushion/cubes/clsr.jpg"
    }

    render (){
        return (
            <Background

             BackgroundImage={this.state.background} 
             /> 
        )
    }
};

export default BackgroundFade;