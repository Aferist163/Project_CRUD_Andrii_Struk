import { useState, useEffect } from "react";

export default function PlanetForm({ onSave, editing, notifyError }) {
    const [form, setForm] = useState({
        nazwa: "",
        system_planet: "",
        klimat: "",
        populacja: "",
        typ_powierzchni: "",
        srednica: "", // new
        masa: "", // new
    });

    useEffect(() => {
        if (editing) {
            setForm({
                ...editing,
                srednica: editing.srednica ?? "",
                masa: editing.masa ?? "",
            });
        }
    }, [editing]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !form.nazwa ||
            !form.system_planet ||
            !form.klimat ||
            !form.populacja ||
            !form.typ_powierzchni
        ) {
            return notifyError();
        } else {
            const payload = {
                ...form,
                populacja:
                    form.populacja === "" ? null : Number(form.populacja),
                srednica: form.srednica === "" ? null : Number(form.srednica),
                masa: form.masa === "" ? null : Number(form.masa),
            };
            onSave(payload);
            setForm({
                nazwa: "",
                system_planet: "",
                klimat: "",
                populacja: "",
                typ_powierzchni: "",
                srednica: "",
                masa: "",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="nazwa"
                placeholder="Nazwa"
                value={form.nazwa}
                onChange={handleChange}
            />
            <input
                name="system_planet"
                placeholder="System"
                value={form.system_planet}
                onChange={handleChange}
            />
            <input
                name="klimat"
                placeholder="Klimat"
                value={form.klimat}
                onChange={handleChange}
            />
            <input
                name="populacja"
                type="number"
                placeholder="Populacja"
                value={form.populacja}
                onChange={handleChange}
            />
            <input
                name="typ_powierzchni"
                placeholder="Typ powierzchni"
                value={form.typ_powierzchni}
                onChange={handleChange}
            />

            {}
            <input
                name="srednica"
                type="number"
                placeholder="Średnica (km)"
                value={form.srednica}
                onChange={handleChange}
            />
            <input
                name="masa"
                type="number"
                placeholder="Masa (kg)"
                value={form.masa}
                onChange={handleChange}
            />

            <button className="sbmt" type="submit">
                {editing ? "Zapisz zmiany" : "Dodaj"}
            </button>
        </form>
    );
}
