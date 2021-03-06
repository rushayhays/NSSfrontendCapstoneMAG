//This will handle any additional calls needed to make the pie chart calculations
//consider renaming to reserve manager



const remoteURL= "http://localhost:8088"

export const getReserveInfo = (num) => {
  return fetch(
    `${remoteURL}/reserves?userId=${num}`
  ).then((res) => res.json());
};

//This will call up mealTypeNutritiontype by userId to calculate nutrition percentages

export const getNutritionInfo = (num) => {
  return fetch(
    `${remoteURL}/mealTypeNutritionTypes?userId=${num}&_expand=mealPacket`
  ).then((res) => res.json());
};

//This will post a new data object to the resercves database
export const addReserve = (object) => {
  return fetch(`${remoteURL}/reserves`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
  }).then(response => response.json())
}

//This will update the reserve Object when a new goal is set
export const updateGoal  = (reserveObject) => {
	return fetch(`${remoteURL}/reserves/${reserveObject.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(reserveObject)
	}).then(data => data.json());
}

export const getUsersReserve = (num) => {
  return fetch(
    `${remoteURL}/reserves/${num}`
  ).then((res) => res.json());
};