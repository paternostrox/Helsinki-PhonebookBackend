import axios from 'axios'
import { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchPersonField from './components/SearchPersonField'
import PersonList from './components/PersonList'
import pbService from './services/phonebookService'
import BadNotification from './components/BadNotification'
import GoodNotification from './components/GoodNotification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')
  const [badMessage, setBadMessage] = useState('')
  const [goodMessage, setGoodMessage] = useState('')

  const getPersonsFromServer = () => {
    pbService.getPersons()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }

  useEffect(() => {
    getPersonsFromServer()
  }, [])

  let filteredPersons = persons.filter((person) => 
    person.name.toLowerCase().includes(searchString.toLowerCase())
  )

  const handleAddPerson = (e) => {
    e.preventDefault()

    let newPerson = {
      name: newName,
      number: newNumber,
    }

    let personId = persons.find(person => person.name == newName)?.id

    if(personId) {
      if(window.confirm(`${newName} is already added to the phonebook. Replace the old number?`)) {
        pbService.updatePerson(personId, newPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== personId ? person : updatedPerson))
          setBadMessage(`${updatedPerson.name}'s number updated`)
        })
        .catch(error => {
          setBadMessage(`Information of ${newName} has already been removed from server`, true)
          setTimeout(() => setBadMessage(''), 5000)
          getPersonsFromServer()
        })
      }
    }
    else {
      pbService.addNewPerson(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
        setGoodMessage(`Added ${addedPerson.name}`)
        setTimeout(() => setGoodMessage(''), 5000)
      })
    }
  }

  const handleRemovePerson = (id) => {
    let personToRemove = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${personToRemove.name}?`))
    pbService.removePerson(id)
    .then(removedPerson => {
      setPersons(persons.filter(person => person.id !== removedPerson.id))
    })
    .catch(error => {
      setBadMessage(`Information of ${personToRemove.name} has already been removed from server`)
      setTimeout(() => setBadMessage(''), 5000)
      getPersonsFromServer()
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <GoodNotification message={goodMessage} />
      <BadNotification message={badMessage}/>
      <AddPersonForm 
        handleAddPerson={handleAddPerson} 
        personName={newName} 
        setPersonName={setNewName} 
        personNumber={newNumber}
        setPersonNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <SearchPersonField 
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <PersonList persons={filteredPersons} handleDelete={handleRemovePerson} />
    </div>
  )
}

export default App