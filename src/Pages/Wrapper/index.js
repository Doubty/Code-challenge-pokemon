import TeamSelect from '../MainScreen';
import CreateNewTeam from '../CreateNewTeam';
import Pokebola from '../../resources/images/pokebola.png';
import PokebolaMulti from '../../resources/images/multiPokebola.jpg';

// This just a update that I was thinking to create
function Wrapper({ activeScreen }) {
  return (
    <>
    
      
      <ul className="nav nav-tabs nav-fill " id="myTab" role="screensTabs">
        <li className="nav-item " role="presentation">

          <a className={`nav-link ${activeScreen === 'team' ? 'active' : ''}`} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">     <img src={Pokebola} width={24} /> Create New Team </a>
        </li>
        <li className="nav-item " role="pokemonTeams">
          <a className={`nav-link ${activeScreen === 'team' ? 'active' : ''}`} id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"> <img src={PokebolaMulti} width={24} /> Teams</a>
        </li>

      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <TeamSelect />
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <CreateNewTeam />
        </div>

      </div>
    </>
  );
}

export default Wrapper;