//This will handle fetch calls used to populate the MyFoodStoragePage

const remoteURL= "http://localhost:8088"

export const getUsersFoodStorage = (num) => {
  return fetch(
    `${remoteURL}/reserveMeals?reserveId=${num}&_expand=mealPacket`
  ).then((res) => res.json());
};

//This call will actually be used on SingleMealCard and will post to reserveMeals
export const addFood = (object) => {
  return fetch(`${remoteURL}/reserveMeals`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
  }).then(response => response.json())
}

//For deleting a mealReserve item
export const deleteMeal = id => {
  return fetch(`${remoteURL}/reserveMeals/${id}`, {
    method: "DELETE"
  }).then(result => result.json())
}