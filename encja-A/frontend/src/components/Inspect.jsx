export default function Inspect({ weather }) {
  if (!weather.length) return <p id="NoData">No weather data available</p>;

  return (
    <>
      <div className="listDiv">
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>City</th>
              <th>Data recorded</th>
              <th>Weather description</th>
              <th>Temperature (°C)</th>
              <th>Humidity</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
