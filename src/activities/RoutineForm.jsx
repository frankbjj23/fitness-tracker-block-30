import { useState } from "react";
import { postRoutine } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export const RoutineForm = ({ syncRoutines }) => {
  const [error, setError] = useState("");
  const { token } = useAuth();

  const tryPostRoutine = async (formData) => {
    const routine = {
      name: formData.get("name"),
      goal: formData.get("goal"),
    };

    try {
      await postRoutine(routine, token);
      await syncRoutines();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Add a New routine</h2>
      <form action={tryPostRoutine}>
        <label>Name</label>
        <input type="text" name="name" />
        <label>Goal</label>
        <input type="text" name="goal" />
        <button>Add Routine</button>
      </form>

      <p>{error}</p>
    </>
  );
};
