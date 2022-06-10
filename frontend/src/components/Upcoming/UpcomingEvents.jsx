import React from 'react'
import EventDate from './EventDate'

import classes from './UpcomingEvents.module.css'

const UpcomingEvents = (props) => {
  const date = new Date('11-24-2022')

  return (
    <div className={classes['upcoming-events']}>
      <EventDate date={date}/>
    </div>
  )
}

export default UpcomingEvents