import turf from '@turf/midpoint';

const Middle =()=>(
<div>
    
</div>
)

class MidPoint extends React.Component {
    state = {
      pointA: [],
      pointB: [],
      midpoint:[],
      mapPoints:[]
    };
  
    componentDidMount() {}
    handleChange = e => {
      e.preventDefault();
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    getMidPoint = e => {
        e.preventDefault();
        let point1=turf.point(this.state.pointA);
        let point2=turf.point(this.state.pointB)
        let midpoint= turf.midpoint(point1,point2),
        this.setState({mapPoints:[point1,point2,midpoint]})
        midpoint.properties['marker-color']='#foo';
    }
      
    render() {
      return (
        <Form
          handleChange={this.handleChange}
          userVal={this.state.username}
          passVal={this.state.password}
          submitUser={this.loginUser}
        />
      );
    }
  }
  
  export default MidPoint;