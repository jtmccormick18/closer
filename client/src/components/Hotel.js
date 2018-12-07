import React from "react";


// // 1. Edit widget size
// var settings22 = {
//     width: '100%', // set the width in px or %
//     height: '420px' // set the height in px or %
// };

// // 2. Fill out your config here and the rest should work
// var s22obj = {
//     aid: 'clsrapp', // your affiliate id for tracking
//     address: 'chicago', // full street address or venue name + city
//     checkin: '2019-04-22', // checkin date for their stay in MM/DD/YYYY or ISO 8601 format
//     maincolor: '00549E', // your brand color in hex (without the #)
//     markerimage: "https://www.stay22.com/logo.png" // url of your logo or event image (in https)
// };

// var params22 = '';

const HotelDisplay = (props) => (
    <div>
    <iframe title="hotelMap" id="stay22-widget" width= {props.width} height={props.height} src={props.src} frameBorder="0" allowFullScreen></iframe>
    </div>
)

class Hotel extends React.Component {
    state = {
        param: '',
        s22obj: {
            aid: 'clsrapp', // your affiliate id for tracking
            lat: '32.896801',
            lng: '-97.038002',
            // address: 'chicago', // full street address or venue name + city
            checkin: '2019-04-22',
            checkout: '2019-04-28', // checkin date for their stay in MM/DD/YYYY or ISO 8601 format
            maincolor: '00549E', // your brand color in hex (without the #)
            markerimage: "https://www.stay22.com/logo.png" // url of your logo or event image (in https)
        },
        settings22: {
            width: '100%', // set the width in px or %
            height: '420px' // set the height in px or %
        },
        params22: ''
    }


    componentDidMount = () => {
        for (var key in this.state.s22obj) {
            if (this.state.params22) {
                this.setState({
                    params22: this.state.params22 += '&'
                })
            }
            this.setState({
                params22: this.state.params22 += key + '=' + encodeURIComponent(this.state.s22obj[key])
            })
        }

        this.setState({
            params22: 'https://www.stay22.com/embed/gm?' + this.state.params22
        })
    };

    render() {
        return (
            <div>
                <HotelDisplay width={this.state.settings22.width} height={this.state.settings22.height} src={this.state.params22} />
            </div>
        )

    };



}

export default Hotel;