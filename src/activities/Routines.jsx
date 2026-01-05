import { useState, useEffect } from "react";
import { getRoutines } from "../api/activities";
import RoutineList from "./RoutineList";
import { RoutineForm } from "./RoutineForm";

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  const syncRoutines = async () => {
    const data = await getRoutines();
    setRoutines(data);
  };

  useEffect(() => {
    syncRoutines();
  }, []);

  return (
    <>
      <h1>Routines</h1>
      <RoutineList routines={routines} />
      <RoutineForm syncRoutines={syncRoutines} />
    </>
  );
};
export default Routines;
