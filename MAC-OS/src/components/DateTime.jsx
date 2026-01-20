import React from 'react'

const DateTime = () => {
  const now = new Date()

  const day = now.toLocaleDateString('en-US', { weekday: 'short' })
  const month = now.toLocaleDateString('en-US', { month: 'short' })
  const date = now.getDate()
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div>
      {day} {month} {date} {time}
    </div>
  )
}

export default DateTime
