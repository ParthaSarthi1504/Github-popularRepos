// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails

  return (
    <li className="li-item">
      <div className="repo-div">
        <img src={avatarUrl} alt={name} className="repo-img" />
        <h1 className="repo-name">{name}</h1>
        <div className="classification">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="star-img"
          />
          <p className="star-para">{starsCount} stars</p>
        </div>
        <div className="classification">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="star-img"
          />
          <p className="star-para">{forksCount} forks</p>
        </div>
        <div className="classification">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            alt="open issues"
            className="star-img"
          />
          <p className="star-para">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
