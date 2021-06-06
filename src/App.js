import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [newRepository, setNewRepository] = useState({ title: null });

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  function handleInputRepositoryChange(event) {
    setNewRepository({ title: event.target.value });
  }

  async function handleAddRepository() {
    if (!newRepository || !newRepository.title) {
      return;
    }

    const response = await api.post('/repositories', {
      title: newRepository.title,
      owner: 'ReactJS User',
    });
    const repository = response.data;
    
    console.log(newRepository);
    
    setRepositories([...repositories, repository]);
    setNewRepository({ title: null });
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div id="container">
      <ul data-testid="repository-list">
        {
          repositories &&
            repositories.map(repo => {
              return (
                <li key={ repo.id }>
                  { repo.title }
                  <button 
                    data-testid="remove-repository-button"
                    onClick={ () => handleRemoveRepository(repo.id) }>
                    { "Remove" }
                  </button>
                </li>
              )
            })
        }
      </ul>
      
      <div id="form">
        <label>
          Title:
          <input 
            type="text"
            onChange={ handleInputRepositoryChange } />
        </label>
        <button 
          data-testid="add-new-repository-button"
          onClick={ () => handleAddRepository(newRepository) }>
            { "Add repository" }
        </button>
      </div>
    </div>
  );
}

export default App;
