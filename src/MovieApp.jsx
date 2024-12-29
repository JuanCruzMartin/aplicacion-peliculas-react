import { useState } from 'react'
import './MovieApp.css'

export const MovieApp = () => {

  const [search, setSearch] = useState('')
  const [movieList, setMoviesList] = useState(null)

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = '045e8b5439a4876f38d948c4ddbe1774'

  const handleInputChange = ({ target }) => {
    setSearch(target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    fetchMovies()
  }

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}&languege=es-ES`)
      const data = await response.json()
      setMoviesList(data.results)

    } catch (error) {
      console.error('ha ocurrido el siguiente error', error)
    }
  }
  return (
    <div className='container'>
      <h1 >Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Escribi una Pelicula'
          value={search}
          onChange={handleInputChange} />

        <button >Buscar</button>
      </form>
      {
        movieList &&
        <div className='movie-list'>
          {movieList.map(movie => (
            <div key={movie.id} className='movie-card'>
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>

      }

    </div>
  )
}
