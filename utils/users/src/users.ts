import fs from "fs"
import csv from "csv-parser"
import axios from "axios"
import { KeycloakService } from "./database/keycloak"
import qs from "qs"
import _test_users from "../data_temp/test_users.json"
require("dotenv").config()
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

const KEYCLOAK_API_HOST = `${process.env.KEYCLOAK_API_HOST}`
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
 * Get keycloak data by email
 *
 * @param {IUser} user
 * @return {*}
 */
async function getKeycloakIDIR_UUID_ByEmail(user: IUser) {
  const response = await axios.get(
    `${KEYCLOAK_API_HOST}/${environment}/idir/users?email=${user.EMAIL_ADDRESS}`,
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
    `${KEYCLOAK_API_HOST}/${environment}/idir/users?firstName=${user.FIRST_NAME}&lastName=${user.LAST_NAME}`,
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
 * Broken currently
 */
export async function main() {
  const filePath = "../data_temp/personsForSIMS.csv"

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

/**
 * Get keycloak data by username
 *
 * @param {IUser} user
 * @return {*}
 */
async function getKeycloakIDIR_UUID_ByGUID(guid: string) {
  const query = qs.stringify({
    guid: guid,
  })

  const response = await axios.get(
    `${KEYCLOAK_API_HOST}/${environment}/idir/users?${query}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  )
  if (response.data.data.length > 0) {
    const keycloakUserData = response.data.data[0]

    return keycloakUserData
  }
}

async function main_test() {
  try {
    //new keycloak copy service
    const keycloakService = new KeycloakService()

    //get token from keycloak
    token = (await keycloakService.getKeycloakToken()) || ""
    console.log("token", token)

    if (!token) {
      console.log("no token")
      return
    }

    const test_users = _test_users as {
      user_identifier: string
      user_guid: string | null
    }[]

    const idirUsers: IUser[] = []

    // write open array to file
    fs.appendFileSync("./data_temp/testIDIRUsers.json", "[\n")

    for (const test_user of test_users) {
      if (!test_user.user_guid) continue

      let keycloakUser: IUser = {
        SECURE_PERSON_ID: "",
        FIRST_NAME: "",
        LAST_NAME: "",
        EMAIL_ADDRESS: "",
      }

      const keycloakUserData = await getKeycloakIDIR_UUID_ByGUID(
        test_user.user_guid
      )
      keycloakUser.keycloakData = keycloakUserData
      console.log("keycloakUserData", keycloakUserData)
      fs.appendFileSync(
        "./data_temp/testIDIRUsers.json",
        JSON.stringify(keycloakUser, null, 2) + ",\n"
      )
      idirUsers.push(keycloakUser)
    }

    // write close array to file
    fs.appendFileSync("./data_temp/testIDIRUsers.json", "]\n")

    // const guid = "DFE2CC5E345E4B1E813EC1DC10852064"
    // const keycloakUserData = await getKeycloakIDIR_UUID_ByGUID(guid)
    // console.log("keycloakUserData", keycloakUserData)
    console.log("idirUsers", idirUsers)

    fs.writeFileSync(
      "./data_temp/test_idirUsers.json",
      JSON.stringify(idirUsers, null, 2)
    )
  } catch (e: any) {
    console.log("e", e)
  }
}

// main()
main_test()
