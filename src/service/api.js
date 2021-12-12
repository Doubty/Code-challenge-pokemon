import axios from "axios";


const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});


export function getPokemonList() {
  return api.get("/pokemon");
}

export default axios;

