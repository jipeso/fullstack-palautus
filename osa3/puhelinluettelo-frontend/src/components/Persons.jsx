import Person from './Person'
import personService from '../services/persons'

const Persons = ({
  persons, 
  showAll, 
  bookFilter,  
  setPersons,
  setMessage
}) => {
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(bookFilter.toLowerCase()))
  
  const handleDeletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
          .then(response => {
            setPersons(persons.filter(p => p.id !== id))
            setMessage(
              `Deleted ${person.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 4000)            
          })
          .catch(error => {
            setMessage(
              `Deleting user ${person.name} was unsuccesful`
            )
            setTimeout(() => {
              setMessage(null)
            }, 4000)             
          })
    }      
  }

  return (
    <ul>
        {personsToShow.map(person =>
          <Person 
            key={person.id}
            person={person}
            handleDeletePerson={() => handleDeletePerson(person.id)}
          />
        )}
    </ul>
  )
}

export default Persons