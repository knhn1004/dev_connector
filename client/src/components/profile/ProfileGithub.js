import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'
import {connect} from 'react-redux'
import {getGithubRepos} from '../../actions/profile'

const ProfileGithub = ({username, getGithubRepos, repos}) => {
  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos, username])
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map(rp => (
          <div className="repo bg-white p-1 my-1" key={rp._id}>
            <div>
              <h4>
                <a href={rp.html_url} target="_blank" rel="noopener noreferrer">
                  {rp.name}
                </a>
              </h4>
              <p>{rp.description}</p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">
                  Stars: {rp.stargazers_count}
                </li>
                <li class="badge badge-dark">
                  Watchers: {rp.watchers_count}
                </li>
                <li class="badge badge-light">
                  Forks: {rp.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  repos: state.profile.repos,
})

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub)
