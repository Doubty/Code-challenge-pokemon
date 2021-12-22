import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useDrop } from "react-dnd";
import PokemonSelect from "../../components/PokemonSelect";
import PokemonSelected from "../../components/PokemonSelected";
import { getPokemonList } from "../../service/api";
import Swal from "sweetalert2";
import axios from "axios";
import "./styles.css";

const MainScreen = () => {
  const [pokemon, setPokemons] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(null);
  const [createList, setCreateList] = useState([]);

  async function loadPokeminList() {
    const res = await getPokemonList();
    setNext(res.data.next);
    setPokemons(res.data.results);
  }

  async function reloadListPokemon() {
    if (next !== null) {
      setLoading(true);

      try {
        const res = await axios.get(next);
        setNext(res.data.next);
        setPokemons(() => [...pokemon, ...res.data.results]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleScroll(e) {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPokemons((items) => [...items]);
      setTeam((items) => [...items]);
      reloadListPokemon();
    }
  }

  function removeAllPokemons(e) {
    Swal.fire({
      icon: "error",
      title: "Team Pokemon",
      text: "Your  pokemon team was deleted with success!",
      confirmButtonText: "Confirm",
    });

    setPokemons((items) => [...items, ...team]);
    setTeam([]);
  }

  useEffect(() => {
    try {
      loadPokeminList();
    } catch (error) {}
  }, []);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "pokemon",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isPokemonOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  function registerpokemonTeam() {
    try {
      if (team.length < 6) {
        Swal.fire({
          icon: "error",
          title: "Team Pokemon",
          text: "Your team pokemon need have 6 pokemons!",
          confirmButtonText: "Confirm",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Team Pokemon",
          text: "New pokemon team was created with success!",
          confirmButtonText: "Confirm",
        });

        setCreateList(() => [...createList, [...team]]);

        let valor;
        if (createList.length === 0) {
          valor = {
            dataPokemon: [...createList, [...team]],
          };
        } else {
          valor = {
            dataPokemon: [...createList, [...team]],
          };
        }

        const data = JSON.stringify(valor);

        localStorage.setItem("dataPokemon", data);
        console.log(localStorage.getItem("dataPokemon"));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const movePokemon = (item) => {
    console.log(item);
    if (item && item.type === "pokemon") {
      //Accepting pokemons into the team
      if (team.length >= 6) {
        Swal.fire({
          icon: "error",
          title: "Team Pokemon is full",
          text: "Your list of pokemon is already completed!",
          confirmButtonText: "Confirm",
        });
      } else {
        setTeam((_team) => [..._team, pokemon[item.index]]);
        setPokemons((_players) =>
          _players.filter((_, idx) => idx !== item.index)
        );
      }
    } else {
      //Removing a pokemon from team
      setPokemons((_players) => [..._players, team[item.index]]);
      setTeam((_team) => _team.filter((_, idx) => idx !== item.index));
    }
  };

  const dragHoverTeamBG = isOver ? "bg-danger" : "bg-light"; // I guess that i won't use this in the future
  const dragHoverPokemonBG = isPokemonOver ? "bg-danger" : "bg-light";

  return (
    <>
      <Header title="CREATE A NEW TEAM" />

      <div className="row ">
        <div className="col ">
          <div className="row justify-content-md-center">
            <div
              className={` pokemonContent col-11 border m-2 ${dragHoverTeamBG}`}
            >
              <div className=" row text-white">
                <div className="col titleTeam">
                  My Team <i className="fa fa-edit"></i>
                </div>
              </div>

              <div className="row py-2 h-100 scrollSet" ref={addToTeamRef}>
                {team.map((pokemon, idx) => (
                  <PokemonSelected
                    {...pokemon}
                    key={pokemon.id}
                    index={idx}
                    pokemonType="team"
                    onDropPokemon={movePokemon}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" row text-white">
        <div className="col-md-12">
          <button
            style={{
              backgroundColor: team.length < 6 ? "#8eda58a1" : "#8FDA58",
            }}
            onClick={registerpokemonTeam}
            className=" buttonCorrect"
          >
            {" "}
            <i className="fa fa-check fa-2x"></i>
          </button>
          <button
            style={{
              backgroundColor: team.length > 0 ? "#F8635A" : "#f8625a8c",
            }}
            onClick={removeAllPokemons}
            className="buttonTrash "
          >
            {" "}
            <i className="fa fa-trash fa-2x"></i>
          </button>
        </div>
      </div>

      <div className="row scrollSet">
        <div className="col">
          <div className="row justify-content-md-center">
            <div
              className={`pokemonContent col-11 border m-2 ${dragHoverPokemonBG}`}
            >
              <div className="row text-white">
                <div className="col titleTeam">Chosse 6 Pokémons:</div>
              </div>
              <div
                onScroll={handleScroll}
                className="row py-2 h-100 scrollSet"
                ref={removeFromTeamRef}
              >
                {pokemon.map((pokemon, idx) => (
                  <PokemonSelect
                    {...pokemon}
                    key={`${pokemon.name}-${idx}`}
                    index={idx}
                    pokemonType="pokemon"
                    onDropPokemon={movePokemon}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className=" row justify-content-md-center">
          <div className="col-md-12">
            <div
              class="spinner-border text-danger buttonReloadList"
              style={{ width: "10rem", height: "10rem", color: "red" }}
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainScreen;
