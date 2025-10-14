import { useState } from "react";
import './App.css'
import PlanetForm from "./components/PlanetForm";
import PlanetList from "./components/PlanetList";

function App() {
  const [planets, setPlanets] = useState([]);
  const [editing, setEditing] = useState(null);

  const addPlanet = (planet) => {
    if (editing) {
      setPlanets(planets.map(p => p.id === editing.id ? planet : p));
      setEditing(null);
    } else {
      setPlanets([...planets, { ...planet, id: Date.now() }]);
    }
  };

  const deletePlanet = (id) => setPlanets(planets.filter(p => p.id !== id));
  const editPlanet = (planet) => setEditing(planet);

  return (
    <div className="MainDiv">
      <h1>CRUD – Planety </h1>
      <PlanetForm onSave={addPlanet} editing={editing} />
      <PlanetList planets={planets} onEdit={editPlanet} onDelete={deletePlanet} />
    </div>
  );
}

export default App;

