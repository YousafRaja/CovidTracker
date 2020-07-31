import React from 'react';

export class US_State extends React.Component{
  constructor(name,latlon) {  	
  	super();  	
  	this.name = name;  	  	
  	this.latlon = latlon;
  	this.cases = -1;
  	console.log("a");
  }
}

export default US_State;