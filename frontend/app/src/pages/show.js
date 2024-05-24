import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/header'
import '../css/pages/show.scss'
import MovieCard from '../components/movieCard'
import CreateButton from '../components/createButton'

function Show() {

  const params = useParams()
  const id = params.id

  const [list, setList] = useState([])
  const [movies, setMovies] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [deletedBookmarkId, setDeletedBookmarkId] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:5000/lists/${id}`)
      .then((res) => {
        console.log(res.data)
        setList(res.data.list)
        setBookmarks(res.data.bookmarks)
        setMovies(res.data.movies)
      })
      .catch((err) => {
        console.log(err)
      });
  }, [id, deletedBookmarkId])

  const handleDeleteBookmark = (id) => {
    console.log("Deleting bookmark with ID:", id);
    axios.delete(`http://localhost:5000/bookmarks/${id}`)
      .then(() => {
        console.log("bookmark has been deleted succefully !")
        setDeletedBookmarkId(id);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div >
      <Header title = {list.name} image={`http://localhost:5000/public/images/${list.image}`} />
      <div className="buttons">
        <div className="new-movie-button">
          <CreateButton text='Add a movie' address={`/lists/${id}/bookmarks/new`} />
        </div>
      </div>
      <div className="movies-list">
        <MovieCard
          movies = {movies}
          bookmarks = {bookmarks}
          handleDeleteBookmark = {handleDeleteBookmark}
        />
      </div>
    </div>
  )
}

export default Show
