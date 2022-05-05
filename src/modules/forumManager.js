//This will handle all the calls for forum

const remoteURL= "http://localhost:8088"

//This will call all the users up
export const getUsers = () => {
    return fetch(
      `${remoteURL}/users`
    ).then((res) => res.json());
  };
