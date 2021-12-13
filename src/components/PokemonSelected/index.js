
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { ReactComponent as Logo } from '../../resources/images/pokebolaEmpty.svg';
import axios from 'axios'

const PokemonShowTeam = ({
  name,
  url,
  index,
  pokemonType,
  onDropPokemon,
}) => {


  const [types, setPokemonTypes] = useState([]);

  const TYPE_COLORS = {
    bug: '#89960B',
    dark: '#322C26',
    dragon: '#6B57D2',
    electric: '#F4CB38',
    fairy: '#DA93DD',
    fighting: '#80311D',
    fire: '#EC5D35',
    flying: '#5D74D5',
    ghost: '#AD6EEC',
    grass: '#68BB2B',
    ground: '#D0B155',
    ice: '#9BDEFB',
    normal: '#C3C0B8',
    poison: '#924694',
    psychic: '#DA3063',
    rock: '#9D853C',
    steel: '#8F8E9E',
    water: '#5CC1ED'
  };

  const pokemonIndex = url?.split('/')[url.split('/').length - 2];
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

  useEffect(() => {


    getDataPokemon();

/* eslint-disable */
  }, [])

  async function getDataPokemon() {


    try {


      // Get pokemon information
      const pokemonRes = await axios.get(pokemonUrl);


      const types = pokemonRes.data.types.map(type => type.type.name);
      setPokemonTypes(types);

    } catch (error) {

      console.log(error)

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
    <div className="col-md-2 mt-0" ref={dragRef}>


      <Logo fill={`${TYPE_COLORS[types[0]]}`} stroke='none' width='200px'
        height='200px' />


      <img
        alt={name}
        src={imgUrl}
        width='200px'
        height='200px'
        className=" rounded-circle mx-auto text-center"
        style={{ border: isDragging ? "5px solid #EC5D35" : "0px", position: 'relative', left: '0.1rem', top: '-12.5rem' }}
      />

    </div>

  );
};


export default PokemonShowTeam;