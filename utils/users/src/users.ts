import fs from "fs"
import csv from "csv-parser"
import axios from "axios"

interface IUser {
  SECURE_PERSON_ID: string
  FIRST_NAME: string
  LAST_NAME: string
  EMAIL_ADDRESS: string
  keycloakData?: {
    username: string
    firstName: string
    lastName: string
    email: string
    attributes: {
      idir_user_guid: string[]
      idir_username: string[]
      display_name: string[]
    }
  }
}

async function readCSVFile(filePath: string): Promise<object[]> {
  const results: object[] = []

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error))
  })
}

const KEYCLOAK_API_TOKEN_URL =
  "https://loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect/token"

const KEYCLOAK_API_USER_URL = "https://api.loginproxy.gov.bc.ca/api/v1"
const SIMS_KEYCLOAK_API_CLIENT_ID = "service-account-team-1190-4229"
const SIMS_KEYCLOAK_API_CLIENT_PASSWORD = "" //DONT PUSH THIS TO GITHUB: fill in the password
const environment = "dev"

let token: string = ""

async function getKeycloakToken() {
  const response = await axios.post(
    KEYCLOAK_API_TOKEN_URL,
    {
      client_id: SIMS_KEYCLOAK_API_CLIENT_ID,
      client_secret: SIMS_KEYCLOAK_API_CLIENT_PASSWORD,
      grant_type: "client_credentials",
    },
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  )

  return response.data.access_token
}

async function getKeycloakIDIR_UUID_ByEmail(user: IUser) {
  const response = await axios.get(
    `${KEYCLOAK_API_USER_URL}/${environment}/idir/users?email=${user.EMAIL_ADDRESS}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (response.data.data.length > 0) {
    const keycloakUserData = response.data.data[0]
    user.keycloakData = keycloakUserData

    return user
  }
}

async function getKeycloakIDIR_UUID_ByName(user: IUser) {
  const response = await axios.get(
    `${KEYCLOAK_API_USER_URL}/${environment}/idir/users?firstName=${user.FIRST_NAME}&lastName=${user.LAST_NAME}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (response.data.data.length > 0) {
    const keycloakUserData = response.data.data[0]
    user.keycloakData = keycloakUserData

    return user
  }
}

async function getKeycloakData(user: IUser) {
  let keycloakUser: IUser | undefined

  if (user.EMAIL_ADDRESS) {
    try {
      keycloakUser = await getKeycloakIDIR_UUID_ByEmail(user)
    } catch (e: any) {
      if (e.response.data.err === "token expired") {
        console.log("token expired")
        token = await getKeycloakToken()
        keycloakUser = await getKeycloakIDIR_UUID_ByEmail(user)
      }
    }
    if (keycloakUser) {
      return keycloakUser
    }
  }

  if (user.FIRST_NAME && user.LAST_NAME) {
    try {
      keycloakUser = await getKeycloakIDIR_UUID_ByName(user)
    } catch (e: any) {
      if (e.response.data.err === "token expired") {
        console.log("token expired")
        token = await getKeycloakToken()
        keycloakUser = await getKeycloakIDIR_UUID_ByName(user)
      }
    }
    if (keycloakUser) {
      return keycloakUser
    }
  }
}

export async function getAllUsers(users: IUser[]) {
  const idirUsers: IUser[] = []

  for (const user of users) {
    const keycloakUser = await getKeycloakData(user)
    if (keycloakUser) {
      console.log("keycloakUser", keycloakUser)
      idirUsers.push(keycloakUser)
      fs.appendFileSync(
        "./src/data_temp/keycloakData.json",
        JSON.stringify(keycloakUser, null, 2) + ",\n"
      )
    } else {
      fs.appendFileSync(
        "./src/data_temp/keycloakData.json",
        JSON.stringify(user, null, 2) + ",\n"
      )
    }
  }
  console.log("idirUsers", idirUsers)

  return idirUsers
}

async function main() {
  const filePath = "./src/data_temp/personsForSIMS.csv"

  token = await getKeycloakToken()

  const users: IUser[] = (await readCSVFile(filePath)) as IUser[]

  fs.appendFileSync("./src/data_temp/keycloakData.json", "[\n")

  const keycloakUsers = await getAllUsers(users)

  fs.appendFileSync("./src/data_temp/keycloakData.json", "]\n")

  // double save data to file
  console.log("keycloakUsers", keycloakUsers)
  fs.writeFileSync(
    "./src/data_temp/keycloakUsers.json",
    JSON.stringify(keycloakUsers, null, 2)
  )
}

export async function testData() {
  const kj: IUser = {
    SECURE_PERSON_ID: "123456789",
    FIRST_NAME: "Kjartan",
    LAST_NAME: "Einarsson",
    EMAIL_ADDRESS: "Kjartan@gov.bc.ca",
  }
  const idirKJ = await getKeycloakData(kj)
  console.log("idirKJ", idirKJ)

  fs.appendFileSync(
    "./src/data_temp/keycloakData.json",
    JSON.stringify(idirKJ, null, 2) + ",\n"
  )

  const curtis = {
    SECURE_PERSON_ID: "123456789",
    FIRST_NAME: "Curtis",
    LAST_NAME: "Upshall",
    EMAIL_ADDRESS: "",
  }
  const idirCurtis = await getKeycloakData(curtis)
  console.log("idirCurtis", idirCurtis)

  fs.appendFileSync(
    "./src/data_temp/keycloakData.json",
    JSON.stringify(idirCurtis, null, 2) + ",\n"
  )
}

main()
