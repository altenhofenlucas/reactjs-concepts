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
    const response = await api.post('/repositories', {
      title: `New Repository From ReactJS - ${Date.now()}`,
      owner: 'ReactJS User',
    });
    const repository = response.data;
    
    setRepositories([...repositories, repository]);
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
                  <button onClick={ () => handleRemoveRepository(repo.id) }>
                    { "Remover" }
                  </button>
                </li>
              )
            })
        }
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
