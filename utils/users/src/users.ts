import fs from "fs"
import csv from "csv-parser"
import axios from "axios"

interface IUser {
  SECURE_PERSON_ID: string
  FIRST_NAME: string
  LAST_NAME: string
  EMAIL_ADDRESS: string
  UUID?: string
  USERNAME?: string
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

async function getKeycloakUUID(user: IUser, token: string) {
  const response = await axios.get(
    KEYCLOAK_API_USER_URL + "/dev/idir/users?email=" + user.EMAIL_ADDRESS,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (response.data.data.length > 0) {
    user.UUID = response.data.data[0].attributes.idir_user_guid[0]
    user.USERNAME = response.data.data[0].attributes.idir_username[0]
    //get more data
    //displayName, GivenName, FamilyName
    return user
  }
}

async function main() {
  const filePath = "./src/data_temp/personsForSIMS.csv"

  let token = await getKeycloakToken()

  const idirUsers: IUser[] = []

  const users: IUser[] = (await readCSVFile(filePath)) as IUser[]

  for (const user of users) {
    console.log("user", user)
    let idirUser: IUser | undefined
    if (user.EMAIL_ADDRESS) {
      try {
        idirUser = await getKeycloakUUID(user, token)
      } catch (e: any) {
        console.log("e", e)
        if (e.response.data.err === "token expired") {
          console.log("token expired")
          token = await getKeycloakToken()
          idirUser = await getKeycloakUUID(user, token)
        }
      }
      if (idirUser) {
        console.log("idirUser", idirUser)
        idirUsers.push(idirUser)
      }
    }
  }

  console.log("idirUsers", idirUsers)
}

main()
