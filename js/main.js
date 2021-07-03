$(document).ready(function () {
  $('#searchForm').submit(function (e) {
    e.preventDefault()
    let searchText = $('#searchText').val()
    getMovies(searchText)
  })
})

/** @type {string} apiKey - OMDB API Key */
const apiKey = 'xxx'

function getMovies(searchText) {
  axios
    .get(` http://www.omdbapi.com/?s=${searchText}&apikey=${apiKey}`)
    .then(response => {
      let movies = response.data.Search
      let output = ''
      $.each(movies, (index, movie) => {
        output += `
                <div class="col-md-3">
                    <div class="well text-center">
                    <img src="${movie.Poster}" alt="Poster for ${movie.Title}" />
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details <span class="sr-only">of ${movie.Title}</span></a>
                    </div>
                </div>
                `
      })
      console.log(output)

      $('#movies').html(output)
    })
    .catch(err => {
      console.error(err)
    })
}

function movieSelected(id) {
  console.log(id)
  sessionStorage.setItem('movieinfo_movieId', id)

  window.location = 'movie.html'
  return false
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieinfo_movieId')
  if (movieId) {
    axios
      .get(` http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
      .then(response => {
        let movie = response.data

        let output = `
                <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" alt="Poster for ${movie.Title}" />
                </div>
                <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
                </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View IMDB info</a>
                        <a href="index.html" class="btn btn-default">Go Back</a>
                    </div>
                </div>
               `
        $('#movie').html(output)
      })
      .catch(err => {
        console.error(err)
      })
  }
}
