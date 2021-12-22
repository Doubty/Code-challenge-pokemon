import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import PokemonShowTeam from "../../components/PokemonShowTeam";
import "./styles.css";

function CreateNewTeam() {
  const [pokemonData, setPokemonList] = useState([]);

  useEffect(() => {
    try {
      var objeto = JSON.parse(localStorage.getItem("dataPokemon"));
      setPokemonList(objeto.dataPokemon);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header title="TEAMS" />
      <div className="row ">
        <div className="col ">
          <div className="row py-2 h-90 scrollSet mt-5">
            {pokemonData.map((pokemonList, idxTeam) => (
              <>
                <div className="titleTeamShow ml-5 mb-4">Team - {idxTeam}</div>
                <div className="row styleContent">
                  {pokemonList.map((pokemon, idx) => (
                    <PokemonShowTeam
                      {...pokemon}
                      key={pokemon.id}
                      index={idx}
                      pokemonType="team"
                      onDropPokemon={() => {}}
                    />
                  ))}

                  <hr className="lineTeam" />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewTeam;
