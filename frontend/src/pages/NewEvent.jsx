import React from 'react'
import NewEventForm from '../components/NewEventForm/NewEventForm'

const NewEvent = (props) => {
  return (
    <NewEventForm user={props.user}/>
  )
}

export default NewEvent