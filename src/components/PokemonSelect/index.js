import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import axios from "axios";

const PokemonSelect = ({ name, url, index, pokemonType, onDropPokemon }) => {
  const TYPE_COLORS = {
    bug: "#89960B",
    dark: "#322C26",
    dragon: "#6B57D2",
    electric: "#F4CB38",
    fairy: "#DA93DD",
    fighting: "#80311D",
    fire: "#EC5D35",
    flying: "#5D74D5",
    ghost: "#AD6EEC",
    grass: "#68BB2B",
    ground: "#D0B155",
    ice: "#9BDEFB",
    normal: "#C3C0B8",
    poison: "#924694",
    psychic: "#DA3063",
    rock: "#9D853C",
    steel: "#8F8E9E",
    water: "#5CC1ED",
  };

  const [types, setPokemonTypes] = useState([]);
  const [id, setId] = useState(null);

  const pokemonIndex = url?.split("/")[url.split("/").length - 2];

  // URL to get information about the pokemon
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

  useEffect(() => {
    getDataPokemon();
  }, [id]);

  /* eslint-disable */

  async function getDataPokemon() {
    try {
      // Get pokemon information
      const pokemonRes = await axios.get(pokemonUrl);

      const types = pokemonRes.data.types.map((type) => type.type.name);

      setPokemonTypes(types);
      setId(pokemonRes.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: pokemonType,
      index,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropPokemon(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className="col-md-2 " ref={dragRef}>
      <div
        className="card"
        style={{
          border: isDragging ? "5px solid #68BB2B" : "0px",
          backgroundColor: "#E9EAEC",
        }}
      >
        <span
          // Here i'm using in the line, because i don't have much time, sorry. But i know this isn't a good practice :)
          style={{
            borderRadius: "100%",
            color: "white",
            position: "relative",
            left: "0.5rem",
            top: "5rem",
            backgroundColor: "#90ADC6",
            width: "2.5rem",
            height: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          #{id}
        </span>

        <img
          alt={name}
          src={imgUrl}
          className=" mx-auto text-center mt-1"
          width="180rem"
          height="180rem"
        />
        <div style={{ marginTop: "-2rem" }} className="card-body text-center">
          <h5 className="card-title d-inline">{name}</h5>
          <div className="text-center">
            {types.map((type) => (
              <span
                key={type}
                className="badge badge-pill mr-1"
                style={{
                  backgroundColor: `${TYPE_COLORS[type]}`,
                  color: "#E9EAEC",
                  borderRadius: "0%",
                  height: "5px",
                  width: "4rem",
                }}
              >
                .
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSelect;
