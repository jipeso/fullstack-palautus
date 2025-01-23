import Person from './Person'

const Persons = ({ persons, showAll, bookFilter }) => {
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(bookFilter.toLowerCase()))

  return (
    <ul>
        {personsToShow.map(person =>
        <Person key={person.name} person={person} />
        )}
    </ul>
  )
}

export default Persons