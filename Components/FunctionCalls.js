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

export async function getCampaigns() {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", await getAuthToken())

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: 'follow'
  }

  let res =  await fetch(baseURL+"campaigns/getCampaigns", requestOptions)

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
    body: JSON.stringify({uid: uid}),
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

export async function getCheckoutLink(amount, campaign, uid) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "amount": amount,
    "campaign": campaign,
    "uid": uid
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  let res = await fetch("http://localhost:5000/chack24-4a090/us-central1/payments/checkout", requestOptions)

  if(res.status == 200) {
    return await res.json()
  } else {
    return res
  }
}

export async function createCampaign(name, description, image, goal, expiry, location, organizer) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: name,
      description: description,
      images: image,
      goal: goal,
      expiry: expiry,
      location: location,
      organizer: organizer
    }),
    redirect: 'follow'
  }

  let res =  await fetch(baseURL+"payments/createCampaign", requestOptions)

  return res
}

export async function updateUser(user){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", await getAuthToken())

  console.log("Yo am i getting to updating user?")
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({user}),
    redirect: 'follow'
  }

  console.log(JSON.stringify(user))

  let res =  await fetch(baseURL+"users/updateUser", requestOptions)
  return res
}