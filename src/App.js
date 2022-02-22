import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import withListLoading from './components/WithListLoading';
import http from "./services/http";

function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    users: null,
  });

  function previous() {
    let previousPage = appState.users[0].id - 30
    
    setAppState({ loading: true });
      http
      .get(`/users?since=${previousPage}`)
      .then((response) => {
        setAppState({ loading: false, users: response.data });
      });
  }

  function next() {
    let lastElement = appState.users[appState.users.length - 1]
    
    setAppState({ loading: true });
      http
      .get(`/users?since=${lastElement.id}`)
      .then((response) => {
        setAppState({ loading: false, users: response.data });
      });
  }

  useEffect(() => {
    setAppState({ loading: true });
      http
      .get("/users")
      .then((response) => {
        setAppState({ loading: false, users: response.data });
      });
  }, [setAppState]);
  return (
    <div className='App'>
      <div className='container'>
        <h1>Users</h1>
      </div>
      <div className='users-container'>
        <ListLoading isLoading={appState.loading} users={appState.users} />
        <button onClick={previous}>
          Previous
        </button>
        <button onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
}
export default App;