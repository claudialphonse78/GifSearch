import React, { Component } from 'react';
import './App.css';
import GifList from './Components/GifList';
import SearchBar from './Components/SearchBar';
import GifModal from './Components/GifModal';
import Modal from 'react-modal';
class App extends Component {
  state = {
    gifs:[],
    selectedGif:null,
    modalIsOpen:false
  }
  handleTermChange = (term) => {
    console.log(term);
    let url =`https://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g,'+')}&api_key=dc6zaTOxFJmzC`;
   fetch(url)
   .then(response => response.json()).then((gif) => {
      console.log(gif);
      this.setState({
        gifs: gif.data
      });
    });
  };
  openModal =(gifs) =>{
    this.setState({
      modalIsOpen :true,
      selectedGif :gifs
    });
  }
  closeModal = () =>{
    this.setState({
      modalIsOpen :false,
      selectedGif :null
    });
  }
  componentWillMount(){
    Modal.setAppElement('body');
  }
  render() {
    return (
      <div>
        <SearchBar onTermChange = {this.handleTermChange} />
        <GifList gifs={this.state.gifs} 
                 onGifSelect = { selectedGif => this.openModal(selectedGif) }/>
        <GifModal modalIsOpen = { this.state.modalIsOpen }
                  selectedGif={this.state.selectedGif}
                  onRequestClose={ () => this.closeModal() } />
      </div>
    );
  }
}

export default App;
