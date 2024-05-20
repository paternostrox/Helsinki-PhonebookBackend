const AddPersonForm = ({handleAddPerson, personName, setPersonName, personNumber, setPersonNumber}) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={personName} onChange={(e) => setPersonName(e.target.value)}/>
      </div>
      <div>
        number: <input value={personNumber} onChange={(e) => setPersonNumber(e.target.value)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddPersonForm