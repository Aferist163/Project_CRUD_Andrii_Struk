import { useState, useEffect } from "react";
import PlanetForm from "./components/PlanetForm";
import PlanetList from "./components/PlanetList";
import './App.css'

function App() {
  const [planets, setPlanets] = useState([]);
  const [editing, setEditing] = useState(null);
  const editPlanet = (planet) => setEditing(planet);

  const fetchPlanets = async () => {
    try {
      const res = await fetch("http://localhost:5000/planets");
      const data = await res.json();
      setPlanets(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const addPlanet = async (planet) => {
    try {
      if (editing) {
    //===Editing
        const res = await fetch(`http://localhost:5000/planets/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(planet),
        });
        const updated = await res.json();
        if (updated.updated) {
          fetchPlanets(); 
          setEditing(null);
        }
      } else {
    //===Add
        const res = await fetch("http://localhost:5000/planets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(planet),
        });
        const newPlanet = await res.json();
        if (newPlanet.id) fetchPlanets(); 
      }
    } catch (err) {
      console.error(err);
    }
  };
  //===Delete
  const deletePlanet = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć planetę?")) return;
    try {
      const res = await fetch(`http://localhost:5000/planets/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.deleted) fetchPlanets();
      if (editing && editing.id === id) setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="MainDiv">
      <h1>CRUD – Planety </h1>
      <PlanetForm onSave={addPlanet} editing={editing} />
      <PlanetList planets={planets} onEdit={editPlanet} onDelete={deletePlanet} />
    </div>
  );
}

export default App;