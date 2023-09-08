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

const KEYCLOAK_API_TOKEN_URL = `${process.env.KEYCLOAK_API_TOKEN_URL}`
const KEYCLOAK_API_USER_URL = `${process.env.KEYCLOAK_API_HOST}`
const SIMS_KEYCLOAK_API_CLIENT_ID = `${process.env.SIMS_KEYCLOAK_API_CLIENT_ID}`
const SIMS_KEYCLOAK_API_CLIENT_PASSWORD = `${process.env.SIMS_KEYCLOAK_API_CLIENT_PASSWORD}`
const environment = `${process.env.KEYCLOAK_ENVIRONMENT}`

let token: string = ""

/**
 * Read CSV file and return array of objects
 *
 * @param {string} filePath
 * @return {*}  {Promise<object[]>}
 */
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

/**
 * Get an access token from keycloak for the SIMS Service account.
 *
 * @return {*}
 */
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

/**
 * Get keycloak data by email
 *
 * @param {IUser} user
 * @return {*}
 */
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

/**
 * Get keycloak data by name
 *
 * @param {IUser} user
 * @return {*}
 */
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

/**
 * Get keycloak data by email or name
 *
 * @param {IUser} user
 * @return {*}
 */
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

/**
 * Get all users from keycloak
 *
 * @export
 * @param {IUser[]} users
 * @return {*}
 */
export async function getAllUsers(users: IUser[]) {
  const idirUsers: IUser[] = []

  for (const user of users) {
    const keycloakUser = await getKeycloakData(user)
    if (keycloakUser) {
      console.log("keycloakUser", keycloakUser)
      idirUsers.push(keycloakUser)
      fs.appendFileSync(
        "../data_temp/keycloakData.json",
        JSON.stringify(keycloakUser, null, 2) + ",\n"
      )
    } else {
      fs.appendFileSync(
        "../data_temp/keycloakData.json",
        JSON.stringify(user, null, 2) + ",\n"
      )
    }
  }
  console.log("idirUsers", idirUsers)

  return idirUsers
}

/**
 * Main function
 *
 */
async function main() {
  const filePath = "../data_temp/personsForSIMS.csv"

  // get keycloak token
  token = await getKeycloakToken()

  // read csv file
  const users: IUser[] = (await readCSVFile(filePath)) as IUser[]

  // write open array to file
  fs.appendFileSync("../data_temp/keycloakData.json", "[\n")

  // get all users from keycloak and write to file
  const keycloakUsers = await getAllUsers(users)

  // write close array to file
  fs.appendFileSync("../data_temp/keycloakData.json", "]\n")

  // double save data to file
  console.log("keycloakUsers", keycloakUsers)
  fs.writeFileSync(
    "../data_temp/keycloakUsers.json",
    JSON.stringify(keycloakUsers, null, 2)
  )
}

main()
