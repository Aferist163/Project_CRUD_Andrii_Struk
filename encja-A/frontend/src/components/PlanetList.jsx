export default function PlanetList({ planets, onEdit, onDelete }) {
  if (!planets.length) return <p>Brak planet</p>;

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>System</th>
          <th>Klimat</th>
          <th>Populacja</th>
          <th>Typ powierzchni</th>
          <th>Edit/Delite</th>
        </tr>
      </thead>
      <tbody>
        {planets.map(p => (
          <tr key={p.id}>
            <td>{p.nazwa}</td>
            <td>{p.system_planet}</td>
            <td>{p.klimat}</td>
            <td>{p.populacja}</td>
            <td>{p.typ_powierzchni}</td>
            <td className="Controlbtn">
              <button onClick={() => onEdit(p)}>🖊 Edit</button>
              <button onClick={() => onDelete(p.id)}>🗑 Delite</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}