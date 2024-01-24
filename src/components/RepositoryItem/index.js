// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachDetails} = props

  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachDetails

  return (
    <li className="repository-each-item">
      <img src={avatarUrl} alt={name} className="repository-item-image" />
      <h1 className="repository-item-heading">{name}</h1>
      <div className="repository-content-container">
        <div className="repository-stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stars-image"
          />
          <p className="stars-title">{starsCount} stars</p>
        </div>
        <div className="repository-forks-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="forks-image"
          />
          <p className="forks-title">{forksCount} forks</p>
        </div>
        <div className="repository-issues-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="issues-image"
          />
          <p className="issues-title">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
