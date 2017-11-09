import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [{name:'jack', url: 'www'}, {name:'jack', url: 'www'}, {name:'jack', url: 'www'}]
    }

  }


  search (term) {
    console.log(`${term} was searched`);
    // TODO
    //Send a Post request to '/repos' 
    
    $.ajax({
      type: "POST",
      url: '/repos',
      data: JSON.stringify({username: term}),
      contentType: 'application/json',
      success: (data) => {
        
        //console.log('SUCCESS AJAX SENT ', data);
        
        //Take the data === the new repos
        this.setState({repos: [{name:'jon', url: 'www'}, {name:'jason', url: 'www'}, {name:'jimmy', url: 'www'}]});
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

//'<!DOCTYPE html><html><head><title>Github Repo Fetcher</title></head><body><h1>HELLOOOOOOO</h1></body></html>'