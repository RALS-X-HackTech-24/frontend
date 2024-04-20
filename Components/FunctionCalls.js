import { getAuthToken } from "./AuthFunctions";


//Base URL
const baseURL = "http://localhost:5000/chack24-4a090/us-central1/"

export async function createUser(user) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", await getAuthToken())

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(user),
    redirect: 'follow'
  }

  let res =  await fetch(baseURL+"users/createUser", requestOptions)

  return res
}

export async function getStays() {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", await getAuthToken())

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: 'follow'
  }

  let res =  await fetch(baseURL+"stays/getStays", requestOptions)

  if(res.status == 200) {
    return res.json()
  } else {
    return res
  }
}

export async function getUser(uid) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", await getAuthToken())

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({id: uid}),
    redirect: 'follow'
  }

  let res = await fetch(baseURL+"users/getUser", requestOptions)
  console.log(res.status)

  if(res.status == 200) {
    return res.json()
  } else {
    return res
  }
}