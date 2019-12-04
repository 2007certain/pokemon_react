import React from 'react';
import './App.css';

import Slide from './components/slide';
import Button from './components/Button';

class App extends React.Component {
  state = {
    pokemonData: [],
    currentIndex: 0,
    translateValue: 0,
    offset: 0,
    limit: 3,
    loaded: false,
    error: false
  }

  componentDidMount() {
    this.getPokemonData();
  }

  async getPokemonData() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${this.state.offset}&limit=${this.state.limit}`)
      const json = await response.json();
      json.results.forEach(async (pokemon) => {
        let pokeresponse = await fetch(pokemon.url)
        let pokejson = await pokeresponse.json();
        this.setState(prevState => ({
          pokemonData: [...prevState.pokemonData, pokejson]
        }));
        this.sortAscending();
      });
    } catch (err) {
      this.setState({ error: true });
    }
  }

  sortAscending = () => {
    let sorted = this.state.pokemonData.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    this.setState({ pokemonData: sorted, loaded: true });
  }

  goToPrevSlide = () => {
    if (this.state.currentIndex === 0)
      return;

    this.setState({
      currentIndex: this.state.currentIndex - 1,
      translateValue: this.state.translateValue + this.slideWidth()
    })
  }

  goToNextSlide = () => {
    if (this.state.currentIndex === (this.state.pokemonData.length / 3) - 1) {
      this.setState({
        offset: this.state.offset + 3,
        currentIndex: this.state.currentIndex + 1,
        translateValue: this.state.translateValue + -(this.slideWidth())
      }, () => {
        this.getPokemonData();
      })
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        translateValue: this.state.translateValue + -(this.slideWidth())
      })
    }
  }

  slideWidth = () => {
    return document.querySelector('.slider').clientWidth - 4;
  }

  render() {
    return (
      <div className="slider">
        <div className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`
          }}>
          {!this.state.error ? this.state.pokemonData.map(pokemon => (
            !this.state.loaded ? <div key={pokemon.id}>loading...</div> : <Slide key={pokemon.id} data={pokemon} />
          )) : <div style={{ textAlign: 'center' }}>Something wrong with fetching data, refresh the page to try again...</div>
          }
        </div>
        {
          this.state.pokemonData.length > 0 && !this.state.error ? <div className="buttonWrapper">
            <Button
              clickHandler={this.goToPrevSlide} label={'Prev'} class={'prevButton button'}
            />
            <Button
              clickHandler={this.goToNextSlide} label={'Next'} class={'nextButton button'}
            />
          </div> : null
        }
      </div>
    );
  }
}

export default App;
