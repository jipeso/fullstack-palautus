import personService from '../services/persons'

const PersonForm = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
  handleNameChange,
  handleNumberChange,
  setMessage
}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNumber
    }
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        personService
          .update(existingPerson.id, personObject)
            .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setMessage(
              `updated ${returnedPerson.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 4000)
            })
          .catch(error => {
            setMessage(
              `Information of ${existingPerson.name} has already been removed`
            )
            setTimeout(() => {
              setMessage(null)
            }, 4000)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
        setNewName('')
        setNewNumber('')            
      }
    }
    else {
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewName('')
        setMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)        
      })
    }
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:
        <input
        value={newNumber}
        onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm