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