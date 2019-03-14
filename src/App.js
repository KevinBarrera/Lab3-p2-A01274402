import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { allTwits } from './allTwits.json';

// Componente TwitToPublic
class TwitToPublic extends Component{
  constructor(){
    super();
    this.state = {
      user: 'KevinBH',
      twitt: '',
      time: '10:45 p.m',
    };
    this.handleTwit = this.handleTwit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onPublicTwit(this.state);
    this.setState({
      user: 'KevinBH',
      twitt: '',
      time: '10:45 p.m',
    });
  }

  handleTwit(e){
    this.setState({
      twitt: e.target.value,
    });
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} className="contenedorFormulario">
        <img id="imageProfile" src="https://www.logolynx.com/images/logolynx/e5/e5ba79334133d2cb362dd639f755a392.png"></img>
        <div id="nameProfile">
          {this.state.user}
        </div>
        <input
          type="text"
          name="twitt"
          className="twit" 
          value={this.state.twitt}
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

  handlePublicTwit(twit){
    this.setState({
      allTwits: [...this.state.allTwits, twit]
    });
  }

  render() {
    const allTwits = this.state.allTwits.map(twit => {
      return(
        <div className="twitteado">
          <img id="imageProfile" src="https://www.logolynx.com/images/logolynx/e5/e5ba79334133d2cb362dd639f755a392.png"></img>
          <div id="nameProfile">{twit.user}</div>
          <label className="twitLabel">
            {twit.twitt}
          </label>
          <div className="hora">
            {twit.time}
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