//This will handle all of the fetch calls centered around the meal packets

const remoteURL= "http://localhost:8088"

export const getUsersMealPackets = (num) => {
  return fetch(
    `${remoteURL}/mealPackets?userId=${num}&_expand=mealType`
  ).then((res) => res.json());
};

//This will get the nutrition information needed to help fill out the mealPacket Cards
//http://localhost:8088/mealNutrition?mealPacketId=1&_expand=nutritionType

export const getNutritionForSingleMeal = (aNum) => {
  return fetch(
    `${remoteURL}/mealNutrition?mealPacketId=${aNum}&_expand=nutritionType`
  ).then((res) => res.json());
} 