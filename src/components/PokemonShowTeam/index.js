import { ReactComponent as Logo } from "../../resources/images/pokebolaEmpty.svg";

const PokemonSelected = ({ name, url }) => {
  const pokemonIndex = url?.split("/")[url.split("/").length - 2];
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

  return (
    <div className="col-md-4 mt-4">
      <Logo stroke="none" width="200px" height="200px" />
      <img
        alt={name}
        src={imgUrl}
        width="200px"
        height="200px"
        className=" rounded-circle mx-auto text-center"
        style={{ position: "relative", left: "-12rem", top: "0rem" }}
      />
    </div>
  );
};

export default PokemonSelected;
