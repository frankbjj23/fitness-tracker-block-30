import { useParams } from "react-router";
import { getActivity, deleteActivity } from "../api/activities";

import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState();
  const [error, setError] = useState("");
  const { token } = useAuth();
  const handleClickDelete = async () => {
    try {
      await deleteActivity(token, id);

      location.href = "/activities";
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    (async () => {
      const response = await getActivity(id);
      setActivity(response);
    })();
  }, [id]);
  return (
    <>
      <div>{activity?.name}</div>
      <div>{activity?.description}</div>
      <div>{activity?.creatorName}</div>
      <button onClick={handleClickDelete}>Delete</button>
      <div>{error}</div>
    </>
  );
};

export default ActivityDetail;
