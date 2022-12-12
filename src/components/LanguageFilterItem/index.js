import './index.css'

const LanguageFilterItem = props => {
  const {filterItemDetails, activeId, getSelectedLanguage} = props
  const onClickLanguage = () => {
    getSelectedLanguage(filterItemDetails.id)
  }
  const activeBtn = activeId ? 'active' : ''
  return (
    <li className="filter">
      <button
        className={`btn ${activeBtn}`}
        type="button"
        onClick={onClickLanguage}
      >
        {filterItemDetails.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
