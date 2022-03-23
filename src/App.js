import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import GithubState from './context/github/GithubState'


const App = () => {

  const [ users, setUsers ] = useState( [] )
  const [ user, setUser ] = useState( {} )
  const [ loading, setLoading ] = useState( false )
  const [ alert, setAlert ] = useState( null )
  const [ repos, setRepos ] = useState( [] )


  // get a single github user
  const getUser = async (username) => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${username}?
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
      setUser(res.data);
      setLoading(false);
  } 

  // Get users Repos
  const getUserRepos = async (username) => {
    setLoading(true)

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
      setRepos(res.data);
      setLoading(false);
  } 


  //clear users from states

  const clearUsers = () => {
     setUsers([]);
     setLoading(false)
   }
  
  const showAlert = (msg, type) => {
     setAlert({ msg, type })

     setTimeout(() => setAlert(null), 1000)
   }

    return (
      <GithubState>
      <Router>
      <div className='App'>
        <Navbar title={'Github Finder'} icon={'X'} />
        <div className='container' >
          <Alert alert={alert} />

        <Switch>
          
        <Route exact path='/' render={props => (
          <Fragment>
          <Search 
          clearUsers={clearUsers} 
          showClear={users.length > 0 ? true : false} 
          setAlert={showAlert} 
          />
          <Users loading={loading} users={users} />
          </Fragment>
        )} />

          <Route exact path='/about' component={About}  />

          <Route exact path='/user/:login' render={props => (
            <User 
            {...props} 
            getUser={getUser} 
            user={user} 
            loading={loading} 
            getUserRepos={getUserRepos}
            repos={repos} 
            />
          )}  />
        </Switch>


        </div>
      </div>
      </Router>
      </GithubState>
    );
  
  }


export default App;
