import React, { useState, useEffect} from 'react'
import '../css/pages/home.scss'
import axios from 'axios'
import Header from '../components/header'
import ListCard from '../components/listCard'
import CreateButton from '../components/createButton'

const headerImage = '/images/homepage.jpeg'


function Home() {

  const [lists, setLists] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/lists")
      .then(res => {
        setLists(res.data);
      })
      .catch(error => {
        console.error("Error fetching lists:", error);
      })
  }, [])

  const handleDeleteList = (id) => {
    axios.delete(`http://localhost:5000/lists/${id}`)
    .then(res => {
      console.log("The list has been deleted succefully !")
      setLists(prevLists => prevLists.filter(list => list._id !== id))
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div>
      <Header title = "Save any kind of movies" image = {headerImage} />
      <div className="container">
        <div className="header-list">
          <h1>MyLists</h1>
          <CreateButton address="/lists/new" text="Create movie list" />
        </div>
        <div className="list-lists">
            {lists.map(list => (
              <ListCard
                key = {list._id}
                id = {list._id}
                image = {list.image}
                name = {list.name}
                handleDelete = {handleDeleteList}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
