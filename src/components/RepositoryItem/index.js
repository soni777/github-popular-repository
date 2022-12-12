import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    avatarUrl,
    starsCount,
    issuesCount,
    forksCount,
  } = repositoryDetails
  return (
    <li className="repositor-item">
      <img className="avatar" src={avatarUrl} alt={name} />
      <h1 className="title">{name}</h1>
      <div className="row">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="row">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="row">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
