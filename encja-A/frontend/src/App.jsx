import { useState, useEffect } from "react";
import PlanetForm from "./components/PlanetForm";
import PlanetList from "./components/PlanetList";
import toast, { Toaster } from 'react-hot-toast';
import ReactEmojis from "@souhaildev/reactemojis";
import './css/App.css'

function App() {
  const notifyError = () => toast.error("Wszystkie pola muszą być wypełnione!",
    {
      iconTheme: {
        primary: '#6b0000ff',
        secondary: '#fff',
      },
      
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },

      position: 'top-left',
  });

  const notifySc = (text) => toast.success(text,
    {
      iconTheme: {
        primary: '#006b00ff',
        secondary: '#fff',
      },
      
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },

      position: 'top-left',
  });
  
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
          notifySc("Zmiany zapisane w bazie danych")};
      } else {
    //===Add
        const res = await fetch("http://localhost:5000/planets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(planet),
        });
        const newPlanet = await res.json();
        if (newPlanet.id) {
          fetchPlanets(), 
          notifySc("Dane zapisane w bazie danych")};
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
      if (result.deleted) fetchPlanets(), notifySc("Dane usunięte");
      if (editing && editing.id === id) setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <>
    <Toaster />
    <div className="MainDiv">
      <h1>CRUD – Planety </h1>
      <PlanetForm onSave={addPlanet} editing={editing} notifyError={ notifyError }/>
      <PlanetList planets={planets} onEdit={editPlanet} onDelete={deletePlanet} />
    </div>
    <ReactEmojis className="STAR" emoji="✨" emojiStyle='1' style={{height: 150, width: 150}}/>
    <ReactEmojis className="ALIEN" emoji="🤖" emojiStyle='1' style={{height: 150, width: 150}}/>
    <ReactEmojis className="ROCKET" emoji="🚀" emojiStyle='2' style={{height: 200, width: 200}}/>
    <ReactEmojis className="ALIEN2" emoji="👽" emojiStyle='3' style={{height: 200, width: 200}}/>
    </>
  );
}

export default App;