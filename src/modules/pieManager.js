//This will handle any additional calls needed to make the pie chart calculations
//consider renaming to reserve manager

// http://localhost:8088/reserves

const remoteURL= "http://localhost:8088"

export const getReserveInfo = (num) => {
  return fetch(
    `${remoteURL}/reserves?userId=${num}`
  ).then((res) => res.json());
};