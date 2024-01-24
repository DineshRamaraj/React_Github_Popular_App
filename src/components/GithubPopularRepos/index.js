import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    apiStatus: apiStatusConstants.initial,
    activeLangId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {activeLangId} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLangId}`,
    )

    if (response.ok) {
      const data = await response.json()
      const popularRepos = data.popular_repos

      // console.log(popularRepos)

      const updatedData = popularRepos.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))

      this.setState({
        repositoryList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickChangeContent = id => {
    this.setState({activeLangId: id}, this.getData)
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {repositoryList} = this.state
    return (
      <ul className="app-repository-list-container">
        {repositoryList.map(eachItem => (
          <RepositoryItem eachDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeLangId} = this.state
    // console.log(repositoryList)

    return (
      <div className="app-container">
        <h1 className="app-heading">Popular</h1>
        <ul className="app-language-list-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              eachDetails={eachItem}
              key={eachItem.id}
              isActive={eachItem.id === activeLangId}
              onClickChangeContent={this.onClickChangeContent}
            />
          ))}
        </ul>
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
