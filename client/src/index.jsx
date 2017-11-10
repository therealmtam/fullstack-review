import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [{username:'jack', url: 'www'}, {username:'jack', url: 'www'}, {username:'jack', url: 'www'}]
    }

  }

  componentDidMount () {
    $.ajax({
      type: "GET",
      url: '/top25',
      contentType: 'application/json',
      success: (data) => {
        this.setState({repos: data});
      } 
    });
  }  

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    
    $.ajax({
      type: "POST",
      url: '/repos',
      data: JSON.stringify({username: term}),
      contentType: 'application/json',
      success: (data) => {
        this.setState({repos: data});
      } 
    });
    
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

