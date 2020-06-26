import React, { useState, useEffect } from 'react'
import Portfolio from './components/Portfolio'
import portfolioService from './services/notes'

const App = () => {
  const [portfolio, setInfo] = useState([])
  const [newNote, setNewNote] = useState('')
  const [newImg, setNewImg] = useState('')
  const [borrarObjId, deleteId] = useState('')

  

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
      .then(initialPortfolio => {
        setInfo(portfolio.concat(initialPortfolio))
        setNewNote('')
        setNewImg('')
      })
  }

  useEffect(() => {
    console.log('effect')
    portfolioService
      .getAll()
      .then(initialPortfolio => {
        console.log('promise fulfilled')
        setInfo(initialPortfolio)
      })
  }, [])
  console.log('render', portfolio.length, 'elements')

  // delete File :) :) :) :( :( :(

  const borrarFunc = event => {

    console.log(borrarObjId)
    portfolioService
      .borrar(borrarObjId)
      .then(initialPortfolio => {
         console.log('WTFFFF ',initialPortfolio.filter(i => i.id !== borrarObjId.id))
    
        setInfo(initialPortfolio.concat(initialPortfolio))
         })
  }

  // change handlers
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleNoteChange2 = (event) => {
    setNewImg(event.target.value)
  }
  const handleNoteChange3 = (e) => {
    console.log(e.target.value)
    deleteId(borrarObjId.concat(e.target.value))
  }

  return (
    <div>
      <h1>Add New Project to Portfolio</h1>
      
      
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

      
      <h2> Portfolio </h2>

      {portfolio.map((info, i) => {

        return (
          <div key={i}>
            <Portfolio key={i} portfolio={info} />
            <form onSubmit={borrarFunc}>
              <button value={info.id}  onClick={handleNoteChange3} type="submit" > delete </button>
            </form>
            
          </div>
          )
        }
      )}

    </div> 
  )
}
export default App