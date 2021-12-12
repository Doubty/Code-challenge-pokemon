import TeamSelect from './Pages/MainScreen';
import CreateNewTeam from './Pages/CreateNewTeam';
import Pokebola from './resources/images/pokebola.png';
import PokebolaMulti from './resources/images/multiPokebola.jpg';
function App() {
  return (
  <>

<ul className="nav nav-tabs " id="myTab" role="screensTabs">
  <li className="nav-item nav-fill w-50" role="presentation">

    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">     <img src={Pokebola} width={24} /> Create New Team </a>
  </li>
  <li className="nav-item nav-fill w-50" role="presentation">
    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"> <img src={PokebolaMulti} width={24} /> Teams</a>
  </li>
  
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"> 
    <TeamSelect/>
    </div>
  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
  <CreateNewTeam/>
  </div>
 
</div>
        </>
  );
}

export default App;
