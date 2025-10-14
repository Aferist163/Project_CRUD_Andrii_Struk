import { useState, useEffect } from "react";

export default function PlanetForm({ onSave, editing }) {
  const [form, setForm] = useState({
    nazwa: "",
    system: "",
    klimat: "",
    populacja: "",
    typ_powierzchni: ""
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nazwa || !form.system || !form.klimat || !form.populacja || !form.typ_powierzchni) return alert("Wszystkie pola muszą być wypełnione!");
    onSave(form);
    setForm({ nazwa: "", system: "", klimat: "", populacja: "", typ_powierzchni: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nazwa" placeholder="Nazwa" value={form.nazwa} onChange={handleChange} />
      <input name="system" placeholder="System" value={form.system} onChange={handleChange} />
      <input name="klimat" placeholder="Klimat" value={form.klimat} onChange={handleChange} />
      <input name="populacja" placeholder="Populacja" value={form.populacja} onChange={handleChange} />
      <input name="typ_powierzchni" placeholder="Typ powierzchni" value={form.typ_powierzchni} onChange={handleChange} />
      <button className='sbmt' type="submit">{editing ? "Zapisz zmiany" : "Dodaj"}</button>
    </form>
  );
}
