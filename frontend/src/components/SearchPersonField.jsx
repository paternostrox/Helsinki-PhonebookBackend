const SearchPersonField = ({searchString, setSearchString}) => {
  return (
    <div>
      search: <input value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
    </div>
  )
}

export default SearchPersonField