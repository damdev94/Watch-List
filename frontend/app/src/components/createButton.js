import React from 'react'
import { Link } from 'react-router-dom'
import '../css/components/CreateButton.scss'

function CreateButton({address, text}) {
  return (
    <Link className='create-button' to={address}> {text} </Link>
  )
}

export default CreateButton
