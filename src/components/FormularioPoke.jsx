import React, { useState } from "react";
import styles from "./FormularioPoke.module.css";

const FormularioPoke = () => {
  const [busqueda, setBusqueda] = useState("");
  const [pokemon, setPokemon] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const fetchPokemon = async (e) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${e.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      fetchPokemon(busqueda);
    }
  };

  return (
    <div className={styles["contenedor-busqueda-pokemon"]}>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Search for a Pokémon"
          className={styles["input-busqueda"]}
        />
        <button type="submit" className={styles["boton-busqueda"]}>
          Buscar
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {pokemon && (
        <div className={styles["pokemon-result"]}>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>
            <strong>Type:</strong>{" "}
            {pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormularioPoke;
