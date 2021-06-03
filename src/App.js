import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories &&
            repositories.map(repo => {
              return (
                <li key={ repo.id }>
                  { repo.title }
                  <button 
                    data-testid="remove-repository-button"
                    onClick={() => handleRemoveRepository(repo.id)}>
                    Remove
                  </button>
                </li>
              )
            })
        }
      </ul>

      <button 
        data-testid="add-new-repository-button"
        onClick={ handleAddRepository }>
          Add repository
      </button>
    </div>
  );
}

export default App;
