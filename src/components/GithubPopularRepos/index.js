import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiConstants = {
  initial: 'Initial',
  success: 'Success',
  failure: 'Failure',
  loader: 'Loader',
}

class GithubPopularRepos extends Component {
  state = {
    repoList: [],
    activeTab: languageFiltersData[0].id,
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getRepository()
  }

  getRepository = async () => {
    this.setState({apiStatus: apiConstants.loader})

    const {activeTab} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const modifiedFetchedData = {
        popularRepos: fetchedData.popular_repos,
      }
      const updatedData = modifiedFetchedData.popularRepos.map(Repo => ({
        name: Repo.name,
        id: Repo.id,
        issuesCount: Repo.issues_count,
        forksCount: Repo.forks_count,
        starsCount: Repo.stars_count,
        avatarUrl: Repo.avatar_url,
      }))
      this.setState({
        repoList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.submitFailureView()
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  submitFailureView = () => {
    this.setState({apiStatus: apiConstants.failure})
  }

  clickingLanguageTab = uniqueId => {
    this.setState({activeTab: uniqueId}, this.getRepository)
  }

  getFailureView = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="fail-view-img"
      />
    </div>
  )

  headerPart = () => {
    const {activeTab} = this.state
    return (
      <div className="bg-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="ul-div">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              tabData={each}
              clickingLanguageTab={this.clickingLanguageTab}
              activeTab={activeTab}
            />
          ))}
        </ul>
      </div>
    )
  }

  getSpecificRepository = () => {
    const {repoList} = this.state
    return (
      <div className="cart-repo-bg">
        <ul className="ul-div2">
          {repoList.map(each => (
            <RepositoryItem key={each.id} repoDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  botContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.getSpecificRepository()
      case apiConstants.failure:
        return this.getFailureView()
      case apiConstants.loader:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        {this.headerPart()}
        {this.botContainer()}
      </div>
    )
  }
}

export default GithubPopularRepos
