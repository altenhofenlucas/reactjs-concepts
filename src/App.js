import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [newRepository, setNewRepository] = useState({});

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
    
    setRepositories([...repositories, repository]);
    setNewRepository({});
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repoIndex = repositories.findIndex(repo => repo.id === id);
    repositories.splice(repoIndex, 1);

    setRepositories([...repositories]);
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
            data-testid="add-new-repository-title"
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
