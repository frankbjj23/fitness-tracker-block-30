import { useState } from "react";
import { deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";

export default function ActivityList({ activities, syncActivities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          syncActivities={syncActivities}
        />
      ))}
    </ul>
  );
}

function ActivityListItem({ activity, syncActivities }) {
  const { token } = useAuth();

  const [error, setError] = useState(null);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <li>
      <Link to={`/activities/${activity.id}`}>
        <p>{activity.name}</p>
      </Link>
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
