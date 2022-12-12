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

const apiConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    popularRepos: [],
    activeLanguageId: languageFiltersData[0].id,
    status: apiConstant.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  renderLanguageFiltersData = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="list-container">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            filterItemDetails={eachItem}
            getSelectedLanguage={this.getSelectedLanguage}
            activeId={eachItem.id === activeLanguageId}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryItem = () => {
    const {status} = this.state
    switch (status) {
      case apiConstant.success:
        return this.onSuccessRender()
      case apiConstant.failure:
        return this.onFailureRender()
      case apiConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  onSuccessRender = () => {
    const {popularRepos} = this.state
    return (
      <ul className="list-container repository-container">
        {popularRepos.map(eachItem => (
          <RepositoryItem key={eachItem.id} repositoryDetails={eachItem} />
        ))}
      </ul>
    )
  }

  onFailureRender = () => (
    <div>
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  getSelectedLanguage = activeLanguageId => {
    this.setState({activeLanguageId}, this.getRepositories)
  }

  getRepositories = async () => {
    this.setState({status: apiConstant.inProgress})
    const {activeLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const popularRepos = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        popularRepos,
        status: apiConstant.success,
      })
    } else {
      this.setState({status: apiConstant.failure})
    }
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguageFiltersData()}
        <div className="bottom-container">{this.renderRepositoryItem()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
