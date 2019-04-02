import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { allTwits } from './allTwits.json';

// Componente TwitToPublic
class TwitToPublic extends Component{
  constructor(){
    super();
    this.state = {
      user_name: 'KevinBH',
      description: '',
      avatar: "https://www.logolynx.com/images/logolynx/e5/e5ba79334133d2cb362dd639f755a392.png"
    };
    this.handleTwit = this.handleTwit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onPublicTwit(this.state);
    this.setState({
      user_name: 'KevinBH',
      description: '',
      avatar: "https://www.logolynx.com/images/logolynx/e5/e5ba79334133d2cb362dd639f755a392.png"
    });
  }

  handleTwit(e){
    this.setState({
      description: e.target.value,
    });
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} className="contenedorFormulario">
        <img id="imageProfile" src={this.state.avatar}></img>
        <div id="nameProfile">
          {this.state.user_name}
        </div>
        <input
          type="text"
          name="description"
          className="twit" 
          value={this.state.description}
          placeholder="¿Qué estás pensando?"
          onChange={this.handleTwit}
        >
        </input>
        <button type="submit" className="publicar">
          Publicar
        </button>
      </form>
    );
  }

}
/*Hasta aquí termina el componente con el formulario */


//Componente principal
class App extends Component {
  constructor(){
    super();
    this.state ={
      allTwits
    }
    this.handlePublicTwit = this.handlePublicTwit.bind(this);
  }

  componentDidMount(){
    fetch("https://still-garden-88285.herokuapp.com/draft_tweets")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            allTwits: result.draft_tweets
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

  handlePublicTwit(twit){
    fetch("https://still-garden-88285.herokuapp.com/draft_tweets", {
      method: "POST",
      body: JSON.stringify(twit),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res=>res.json())
    .then((res)=>{
      this.setState({
        allTwits: [...this.state.allTwits, res.draft_tweet]
      });
    })

  }

  render() {
    const allTwits = this.state.allTwits.map(twit => {
      return(
        <div className="twitteado">
          <img id="imageProfile" src={twit.avatar}></img>
          <div id="nameProfile">{twit.user_name}</div>
          <label className="twitLabel">
            {twit.description}
          </label>
          <div className="hora">
            {twit.created_at}
          </div>
        </div>
      );
    }); 

    return (
      <div className="App">
        <nav className="navBar">
          <img className="logo" src="http://communicasound.com/wp-content/uploads/2017/02/Twitter-Logo-PNG-1.png"></img>
          <div className="textoNavBar">Twitter</div>
        </nav>
        <TwitToPublic onPublicTwit={this.handlePublicTwit}></TwitToPublic>
        {allTwits}
      </div>
    );
  }
}

export default App;