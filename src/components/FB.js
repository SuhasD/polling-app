import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

class FBLogin extends React.Component {

 constructor() {
    super();
    this.responseFacebook = this.responseFacebook.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  state = {
    isLoggedin: false,
    name:'',
    email:'',
    img:'',
    polls:[],
    isLoaded:false,
    error:'',
  };

  componentDidMount(){
    fetch("https://stateapi-test.votenow.tv/widgets/get?wid=31204006f9270601")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            polls: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  responseFacebook(response) {
    console.log(response);
    this.setState({
    	isLoggedin:true,
    	name:response.name,
    	email:response.email,
    	img:response.picture.data.url
    });
  }

  handleLogoutClick(){
 	 window.FB.logout();
 	  this.setState({
    	isLoggedin:false,
    	name:'',
    	email:'',
    	img:''
    });

  }

  render() {
  	let user;
  	let button;
  	const { error, isLoaded, polls } = this.state;


  	if(this.state.isLoggedin){
 		button = (<button className="inBtn"> Vote Now </button>)

  		user = (
  			<div className="loggedHeader">
  				<img src={this.state.img} alt="profile"/>
  				 <p>Welcome back, {this.state.name}</p>
  				 <button onClick={this.handleLogoutClick}> Logout </button>
  			</div>
  		)
  	} else {
  		button = (<button className="outBtn" onClick={this.handleLoginClick}>Login to Vote </button>)
  		user = ( <FacebookLogin
	        appId="352533885573951"
	        autoLoad={true}
	        fields="name,email,picture"
	        callback={this.responseFacebook}
	      />)
  	}
    return (
    	<div>
	  	{user}
	   <div className="polls">
	   		<h2> Pick your favorite cat! </h2>
          {polls.map(item => (
            <div className="poll" key={item.name}>
              <img src={item.image} alt="{item.name}"/>
              <p className="title">{item.name}</p>
              <p className="bio"> {item.bio}</p>
             {button}
            </div>
          ))}
          <div className="clearfix"></div>
        </div>

      </div>
    )
  }
}

export default FBLogin;