import { geocodingKey } from "../secrets/keys";
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
    return await res.json()
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
    return await res.json()
  } else {
    return res
  }
}

export async function reverseGeoCode(lat, long) {
  
    var requestOptions = {
      method: "GET",
      redirect: 'follow'
    }
  
    let res = await fetch("https://geocode.maps.co/reverse?lat=" + lat + "&lon=" + long + "&api_key=" + geocodingKey, requestOptions)

    let data = await res.json()

    if(res.status == 200) {
      return await data.address
    } else {
      return res
    }
}