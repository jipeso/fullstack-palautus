const Person = ({ person, handleDeletePerson }) => {
    return (
        <li>
            {person.name} {person.number}
            <button onClick={handleDeletePerson}>delete</button>    
        </li>
    )
}

export default Person