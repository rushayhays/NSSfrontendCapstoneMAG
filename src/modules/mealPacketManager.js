//This will handle all of the fetch calls centered around the meal packets

const remoteURL= "http://localhost:8088"

export const getUsersMealPackets = (num) => {
  return fetch(
    `${remoteURL}/mealPackets?userId=${num}&_expand=mealType`
  ).then((res) => res.json());
};

//this will get a single mealPacket (for editing purposes)
export const getSingleUserMealPacket = (num) => {
  return fetch(
    `${remoteURL}/mealPackets/${num}`
  ).then((res) => res.json());
};

//This will get the nutrition information needed to help fill out the mealPacket Cards
//http://localhost:8088/mealNutrition?mealPacketId=1&_expand=nutritionType

export const getNutritionForSingleMeal = (aNum) => {
  return fetch(
    `${remoteURL}/mealTypeNutritionTypes?mealPacketId=${aNum}&_expand=nutritionType`
  ).then((res) => res.json());
} 


export const addMealPacket = (mealPacketObject) => {
  return fetch(`${remoteURL}/mealPackets`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(mealPacketObject)
  }).then(response => response.json())
}


//When adding a new meal packet, a post must be made to mealNutrition for each nutrient type
export const addNutrient = (newNutrientObject) => {
  return fetch(`${remoteURL}/mealTypeNutritionTypes`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newNutrientObject)
  }).then(response => response.json())
}

//You need two delete functions, when deleting a mealPacket card
//One to delete from mealPacket, and one to delete from mealTypeNutritionTypes

export const deleteMealPacket = (mealNum) => {
  return fetch(`${remoteURL}/mealPackets/${mealNum}`, {
    method: "DELETE"
  }).then(result => result.json())
}

export const deleteMealNutrientType = (mealNutriNum) => {
  return fetch(`${remoteURL}/mealTypeNutritionTypes/${mealNutriNum}`, {
    method: "DELETE"
  }).then(result => result.json())
}




