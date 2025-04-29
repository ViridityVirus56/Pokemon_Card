import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Pokecard from './Pokecard';
import './App.css';
import './fonts.css';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState([]);

  const fetchData = async () => {
    const nameInput = document.getElementById('search-query').value.toLowerCase();
    if (!nameInput) {
      setError('Please enter a Pokémon name.');
      setPokemonData(null);
      setDesc([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameInput}`);
      if (!response.ok) {
        setError('Pokémon not found. Please check the name and try again.');
        setPokemonData(null);
        setDesc([]);
        return;
      }

      const data = await response.json();
      const moveDescriptions = [];

      for (let i = 0; i < 2; i++) {
        const moveUrl = data.moves[i]?.move.url;
        if (moveUrl) {
          const moveResponse = await fetch(moveUrl);
          const moveData = await moveResponse.json();
          const effectEntry = moveData.effect_entries.find(
            (entry) => entry.language.name === 'en'
          );
          moveDescriptions.push(effectEntry?.short_effect || 'No description available.');
        } else {
          moveDescriptions.push('No description available.');
        }
      }

      setPokemonData({
        id: data.id,
        name: data.name,
        types: data.types.map((typeInfo) => typeInfo.type.name),
        img: data.sprites.front_default,
        moves: data.moves.slice(0, 2).map((move) => move.move.name),
      });
      setDesc(moveDescriptions);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching Pokémon data.');
      setPokemonData(null);
      setDesc([]);
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  };

  return (
    <div className="App">
      <div className="searchBar">
        <input
          type="text"
          id="search-query"
          placeholder="Enter Pokémon name (e.g., Bulbasaur)"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              fetchData();
            }
          }}
        />
        <button type="submit" onClick={fetchData} disabled={loading}>
          <CiSearch />
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {loading && (
        <div className="loading">
          <img
            src="https://cdn.dribbble.com/userupload/21186314/file/original-b7b2a05537ad7bc140eae28e73aecdfd.gif"
            alt="Loading..."
          />
        </div>
      )}
      {pokemonData && !loading && (
        <Pokecard
          id={pokemonData.id}
          name={pokemonData.name}
          types={pokemonData.types}
          img={pokemonData.img}
          moves={pokemonData.moves}
          desc={desc}
        />
      )}
      <a href="https://lordicon.com/">Icons by Lordicon.com</a>
    </div>
  );
}

export default App;
