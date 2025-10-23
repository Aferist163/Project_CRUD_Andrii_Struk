import { useState, useEffect } from "react";
import lock from "../../assets/img/lock.svg"

export default function WeatherForm({ onSave, editing, notifyError }) {

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [form, setForm] = useState({
    city: "",
    data_recorded: "",
    weather_description: "",
    temperature: "",
    humidity: ""
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      notifyError("You must be logged in to add data");
      return;
    }

    if (!form.city || !form.data_recorded || !form.weather_description || !form.temperature || !form.humidity) {
      return notifyError("Make sure all fields are completed!");
    } else {
      onSave(form);
      setForm({ city: "", data_recorded: "", weather_description: "", temperature: "", humidity: "" });
    }
  };

  return (
    <>
      <h1>CRUD - Weather</h1>
      <form onSubmit={handleSubmit} className="blur">
        <input className="mainInput" name="city" placeholder="City" value={form.city} onChange={handleChange} disabled={!isLoggedIn} />
        <input className="mainInput" name="data_recorded" type="date" placeholder="Data recorded" value={form.data_recorded} onChange={handleChange} disabled={!isLoggedIn} />
        <input className="mainInput" name="weather_description" placeholder="Weather description" value={form.weather_description} onChange={handleChange} disabled={!isLoggedIn} />
        <input className="mainInput" name="temperature" type="number" placeholder="Temperature" value={form.temperature} onChange={handleChange} disabled={!isLoggedIn} />
        <input className="mainInput" name="humidity" placeholder="Humidity" value={form.humidity} onChange={handleChange} disabled={!isLoggedIn} />
        <button className="sbmt" type="submit" >
          {!isLoggedIn && (<div className="locked">
            <img src={lock} alt="lock" />
          </div>)}
          {editing ? "Save changes" : "Add"}
        </button>
      </form>
    </>
  );
}