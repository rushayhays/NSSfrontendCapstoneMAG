//This will handle all of the fetch calls centered around the meal packets

const remoteURL= "http://localhost:8088"

export const getUsersMealPackets = () => {
    return fetch(
      `${remoteURL}/mealPackets?&_expand=mealType`
    ).then((res) => res.json());
  };

//?currentUserId=${currentUserId}