import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    
    <div>
      {props.repos.map((repo, index) => (
        <div key={index}>
          ({index + 1}) 
          <p>{repo.username}</p>
          <a href={repo.url}>
            {repo.url} 
          </a>
        </div>
      ))}
    </div>
    
  </div>
)

export default RepoList;