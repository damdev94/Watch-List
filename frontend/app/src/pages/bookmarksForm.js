import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../css/pages/bookmarksForm.scss'

function BookmarksForm({handleModal, handleCreateBookmark,}) {

  const params = useParams()
  const id = params.id

  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:5000/lists/${id}/bookmarks/new`)
    .then(res => {
      setMovies(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault()
    const bookmarkData = {
      comment: comment,
      movieId: selectedMovie,
      listId: id
    }
    axios.post(`http://localhost:5000/lists/${id}/bookmarks/new`, bookmarkData)
    .then(res => {
      console.log('Bookmark created:', res.data)
      handleModal()
      handleCreateBookmark(res.data.bookmark._id)
    })
    .catch(err => {
      console.log(err);
    })
  }


  return (
    <div>
      <h2>make your choice</h2>
      <form className='form-container' id='addMovie' onSubmit={handleSubmit}>
        <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
          <option value="">--choose a movie </option>
          {movies.map(movie => (
            <option key={movie._id} value={movie._id}>{movie.title}</option>
          ))}
        </select>
        <textarea id="review" name="review" rows="4" cols="50" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default BookmarksForm
