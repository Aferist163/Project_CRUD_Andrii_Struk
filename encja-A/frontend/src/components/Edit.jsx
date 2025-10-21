import WeatherForm from "../module/WeatherForm";
import WeatherList from "../module/WeatherList";

export default function Edit({ weather, onSave, editing, onEdit, notifyError, onDelete }) {
  return (
    <>
      <WeatherForm onSave={onSave} editing={editing} notifyError={notifyError} />
      <WeatherList weather={weather} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}
