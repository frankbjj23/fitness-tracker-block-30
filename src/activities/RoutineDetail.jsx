import { useEffect, useState } from "react";
import {
  deleteRoutine,
  getRoutine,
  getActivities,
  postSet,
} from "../api/activities";
import { useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";

const RoutineDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [routineDetail, setRoutineDetail] = useState();
  const [error, setError] = useState("");
  const [activities, setActivities] = useState([]);

  const tryAddSet = async (formData) => {
    setError("");
    const set = {
      activityId: Number(formData.get("activityId")),
      routineId: Number(id),
      count: Number(formData.get("count")),
    };
    try {
      await postSet(set, token);
      const updated = await getRoutine(id);
      setRoutineDetail(updated);
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    (async () => {
      const response = await getRoutine(id);
      setRoutineDetail(response);

      const activityList = await getActivities();
      setActivities(activityList);
    })();
  }, [id]);

  return (
    <>
      <h1>{routineDetail?.name}</h1>
      <div>{routineDetail?.goal}</div>
      <div>{routineDetail?.creatorName}</div>
      <ul>
        {routineDetail?.sets.map((set) => (
          <li key={set.id}>
            <p>
              {set.name} x {set.count}
            </p>
          </li>
        ))}
      </ul>
      {routineDetail?.sets?.length === 0 && <p>Add a set</p>}
      {token && (
        <form action={tryAddSet}>
          <label>
            Activity
            <select name="activityId">
              {activities?.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Count
            <input type="number" name="count" min="1" />
          </label>
          <button>Add Set</button>
        </form>
      )}
      <button
        onClick={async () => {
          try {
            await deleteRoutine(id, token);
          } catch (e) {
            setError(e.message);
          }
        }}
      >
        Delete
      </button>
      <p>{error}</p>
    </>
  );
};

export default RoutineDetail;
