import { useState, useEffect } from "react";

export default function WeatherForm({ onSave, editing, notifyError }) {
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
    if (!form.city || !form.data_recorded || !form.weather_description || !form.temperature || !form.humidity) {
      return notifyError("Make sure all fields are completed!");
    } else {
      onSave(form);
      setForm({city: "", data_recorded: "", weather_description: "", temperature: "", humidity: ""});
    }
  };

  return (
    <>
      <h1>CRUD - Weather</h1>
      <form onSubmit={handleSubmit}>
        <input name="city" placeholder="City" value={form.city} onChange={handleChange}/>
        <input name="data_recorded" type="date" placeholder="Data recorded" value={form.data_recorded} onChange={handleChange}/>
        <input name="weather_description" placeholder="Weather description" value={form.weather_description} onChange={handleChange}/>
        <input name="temperature" type="number" placeholder="Temperature" value={form.temperature} onChange={handleChange}/>
        <input name="humidity" placeholder="Humidity" value={form.humidity} onChange={handleChange}/>
        <button className="sbmt" type="submit">
          {editing ? "Save changes" : "Add"}
        </button>
      </form>
    </>
  );
}