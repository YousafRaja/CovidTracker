import React, { Component } from 'react';
import API_KEY from './offlineSettings.js';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';
import US_State from './models/US_state.js';

const mapStyles = {
  width: '100%',
  height: '100%'
};





export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},    
    statesWaiting:56,
    ready:false,
    US_States :{
       "AL" : new US_State("Alabama",[32.318230,-86.902298]),

       "AS" : new US_State("American Samoa",[-14.3064071,-170.6950175]),
       "DC" : new US_State("District of Columbia",[38.942142, -77.025955]),
       "GU" : new US_State("Guam",[13.444304, 144.793732]),
       "MP" : new US_State("Northern Marianas",[15.1063896, 145.7065244]),
       "PR" : new US_State("Puerto Rico",[18.466333, -66.105721]),
       "VI" : new US_State("Virgin Islands",[34.297878, -83.824066]),

       "AK" : new US_State("Alaska",[66.160507,-153.369141]),
       "AZ" : new US_State("Arizona",[34.048927,-111.093735]),
       "AR" : new US_State("Arkansas",[34.799999,-92.199997]),
       "CA" : new US_State("California",[36.778259, -119.417931]),
       "CO" : new US_State("Colorado",[39.113014,-105.358887]),
       "CT" : new US_State("Connecticut",[41.599998,-72.699997]),
       "DE" : new US_State("Delaware",[39.000000,-75.500000]),
       "FL" : new US_State("Florida  ",[27.994402,-81.760254]),
       "GA" : new US_State("Georgia ",[33.247875,-83.441162]),
       "HI" : new US_State("Hawaii",[19.741755,-155.844437]),
       "ID" : new US_State("Idaho",[44.068203,  -114.742043]),
       "IL" : new US_State("Illinois",[40.000000,-89.000000]),
       "IN" : new US_State("Indiana",[40.273502,-86.126976]),
       "IA" : new US_State("Iowa",[42.032974, -93.581543]),
       "KS" : new US_State("Kansas",[38.500000,-98.000000]),
       "KY" : new US_State("Kentucky",[37.839333,-84.270020]),
       "LA" : new US_State("Louisiana",[30.391830,  -92.329102]),
       "ME" : new US_State("Maine",[45.367584,-68.972168]),
       "MD" : new US_State("Maryland",[ 39.045753,-76.641273]),
       "MA" : new US_State("Massachusetts",[42.407211,-71.382439]),
       "MI" : new US_State("Michigan",[44.182205,-84.506836]),       
       "MN" : new US_State("Minnesota",[46.392410,  -94.636230]),
       "MS" : new US_State("Mississippi ",[33.000000,-90.000000]),
       "MO" : new US_State("Missouri",[38.573936,-92.603760]),
       "MT" : new US_State("Montana",[46.965260,-109.533691]),
       "NE" : new US_State("Nebraska",[41.500000,-100.000000]),
       "NV" : new US_State("Nevada",[39.876019,-117.224121]),
       "NH" : new US_State("New Hampshire",[44.000000,-71.500000]),
       "NJ" : new US_State("New Jersey",[39.833851,-74.871826]),
       "NM" : new US_State("New Mexico",[34.307144,-106.018066]),
       "NY" : new US_State("New York",[43.000000,-75.000000]),
       "NC" : new US_State("North Carolina",[ 35.782169,-80.793457]),
       "ND" : new US_State("North Dakota",[ 47.650589,-100.437012]),
       "OH" : new US_State("Ohio",[40.367474,-82.996216]),       
       "OK" : new US_State("Oklahoma",[36.084621,-96.921387]),
       "OR" : new US_State("Oregon ",[44.000000,-120.500000]),
       "PA" : new US_State("Pennsylvania",[41.203323,-77.194527]),
       "RI" : new US_State("Rhode Island",[41.700001,-71.500000]),
       "SC" : new US_State("South Carolina",[33.836082,-81.163727]),
       "SD" : new US_State("South Dakota",[44.500000,-100.000000]),
       "TN" : new US_State("Tennessee",[35.860119,-86.660156]),
       "TX" : new US_State("Texas",[  31.000000,-100.000000]),
       "UT" : new US_State("Utah",[39.419220,-111.950684]),
       "VT" : new US_State("Vermont",[44.000000,-72.699997]),
       "VA" : new US_State("Virginia",[37.926868,-78.024902]),
       "WA" : new US_State("Washington",[47.751076,-120.740135]),
       "WV" : new US_State("West Virginia",[39.000000,  -80.500000]),
       "WI" : new US_State("Wisconsin",[44.500000,-89.500000]),
       "WY" : new US_State("Wyoming",[  43.075970,  -107.290283])

    },
    data : []
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };



  async componentDidMount(){
    var url = "https://covidtracking.com/api/states/daily";
    var response = await fetch(url);
    this.data = await response.json();            
    this.data.slice(0,this.state.statesWaiting).map(async (info) =>{             
      this.state.US_States[info['state']].cases =info['positive'];
      
    })        
    this.setState({ready:true})
  };

  async fillTable(){
    this.data.slice(0,this.state.statesWaiting).map(async (info) =>{             
      this.state.US_States[info['state']].cases =info['positive'];
      
    })        
    this.setState({ready:true})
  };


  render() {
    console.log(this.state)
    if (this.state.ready==false){
      return(
        <div>
      <div>{this.state.ready}</div>
      <div>Hang on, waiting for APIs to respond, this takes 10-20 seconds..</div>
      </div>
      )
    }else{      
      return (
        <CurrentLocation
          centerAroundCurrentLocation
          google={this.props.google}
        >
          {Object.entries(this.state.US_States).map( ([key, value]) => (
            <Marker
              key={key} // Need to be unique
              onClick={this.onMarkerClick}
              name={this.state.US_States[key].name}
              cases={this.state.US_States[key].cases}
              position={{lat:this.state.US_States[key].latlon[0],lng:this.state.US_States[key].latlon[1]}}
            />
          ))}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
              <h4>Total Cases:</h4>
              <h4>{this.state.selectedPlace.cases}</h4>
            </div>
          </InfoWindow>

        </CurrentLocation>
      );    
    }
  }  
}

export default GoogleApiWrapper({
  apiKey: process.env.API_KEY
})(MapContainer);