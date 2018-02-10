import React, {Component} from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: [],
      searching: undefined
    };
  }

  searchByTitle() {
    this.setState({searching: this.refs.movieSearch.value})
  }

  searchMovie() {
    let city = this.refs.movieSearch.value.split(" ").join("+")
    let api_key = process.env.API_KEY
    let api_url = `http://www.omdbapi.com/?apikey=40e9cece&t=${city}`
    axios.get(api_url, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    }).then((results) => {
      console.log(results.data)
      this.setState({poster: results.data})
    });
  }

  render() {
    const Film = this.state.poster
    const displayMovieData = () => {
      let moviePage = Film.imdbID
      let imdbLink = `http://www.imdb.com/title/${moviePage}/`

      if (Film) {
        return (<div className="Show">
          <a target="_blank" href={imdbLink}>
            <img src={Film.Poster}></img>
          </a>
          <p>Movie Title: {Film.Title}</p>
          <p>Year Released: {Film.Year}</p>
          <p>Release Date: {Film.Released}</p>
          <p>Actors: {Film.Actors}</p>
        </div>)
      }
    }

    return (<div>
      <h3>Movie Search</h3>
      <p>Click the poster to go to the IMDB page</p>
      <input style={{
          width: '20%'
        }} type="text" onChange={this.searchMovie.bind(this)} ref="movieSearch" placeholder="Type the name of the movie here"/>
      <br></br>
      {displayMovieData()}
    </div>);
  }
};
