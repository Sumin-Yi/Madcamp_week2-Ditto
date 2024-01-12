import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
      fetch("http://172.10.8.235/api").then(
          res => res.json()
      ).then(
          data => {
              setData(data);
              console.log(data)
          }
      )
  }, [])
  return (
      <div>
          {(data.message === null) ? (
              <p>Why fail?</p>
          ) : (
              <p>{data.message}</p>
          )}
      </div>
  )
}

export default App
