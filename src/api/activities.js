const API = import.meta.env.VITE_API;

export const getActivity = async (id) => {
  try {
    const response = await fetch(API + `/activities/${id}`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const getRoutine = async (id) => {
  try {
    const response = await fetch(API + `/routines/${id}`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const getRoutines = async () => {
  try {
    const response = await fetch(API + `/routines/`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

/** Fetches an array of activities from the API. */
export async function getActivities() {
  try {
    const response = await fetch(API + "/activities");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Requests the API to delete the activity with the given ID.
 * A valid token is required.
 */
export async function deleteActivity(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }

  const response = await fetch(API + "/activities/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export const deleteRoutine = async (id, token) => {
  if (!token) {
    throw Error(`You must be signed in to delete a routine.`);
  }

  const response = await fetch(API + `/routines/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
};

export const postRoutine = async (routine, token) => {
  if (!token) {
    throw Error(`You must be signed in to post a routine`);
  }
  const response = await fetch(API + `/routines`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(routine),
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
};

export const postSet = async (set, token) => {
  if (!token) {
    throw Error(`You must be signed in to add sets`);
  }
  const response = await fetch(API + `/sets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(set),
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
};
