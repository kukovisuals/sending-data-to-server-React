import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Portfolio from './components/Portfolio'
import portfolioService from './services/notes'

const App = () => {
  const [portfolio, setInfo] = useState([])
  const [newNote, setNewNote] = useState('')
  const [newImg, setNewImg] = useState('')

  

  const addNote = event => {
  event.preventDefault()
  const noteObject = {
    work: ["branding"],
    title: newNote,
    description: "photography",
    image: "images/portfolio/grid/"+newImg
  }

  portfolioService
    .create(noteObject)
    .then(response => {
      setInfo(portfolio.concat(response.data))
      setNewNote('')
      console.log(response)
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleNoteChange2 = (event) => {
    setNewImg(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    portfolioService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setInfo(response.data)
      })
  }, [])
  console.log('render', portfolio.length, 'elements')

  return (
    <div>
      <h1>Notes</h1>
      
      <ul>
        {portfolio.map((info, i) => 
          <Portfolio key={i} portfolio={info} 
          />
        )}

      </ul>
      <form onSubmit={addNote}>
        Title Name <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <br/>
        Image File  <input
          value={newImg}
          onChange={handleNoteChange2}
        />
        <br/> <br/>
        <button type="submit">save</button>
      </form>   

    </div> 
  )
}
export default App