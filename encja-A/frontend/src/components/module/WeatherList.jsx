export default function WeatherList({ weather, onEdit, onDelete }) {
    if (!weather.length) {
    return (
      <>
        <div className="listDiv blur">
          <p id="NoData" style={{ fontSize: '1vmax' }}>No weather data available</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="listDiv blur">
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>City</th>
              <th>Data recorded</th>
              <th>Weather description</th>
              <th>Temperature (°C)</th>
              <th>Humidity</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {weather.map((w) => (
              <tr key={w.id}>
                <td>{w.city}</td>
                <td>{w.data_recorded}</td>
                <td>{w.weather_description}</td>
                <td>{w.temperature}</td>
                <td>{w.humidity}</td>
                <td className="Controlbtn">
                  <button onClick={() => onEdit(w)}>🖊 Edit</button>
                  <button onClick={() => onDelete(w.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}