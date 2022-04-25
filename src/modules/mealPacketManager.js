//This will handle all of the fetch calls centered around the meal packets

const remoteURL= "http://localhost:8088"

export const getUsersMealPackets = (num) => {
    return fetch(
      `${remoteURL}/mealPackets?userId=${num}&_expand=mealType`
    ).then((res) => res.json());
  };

