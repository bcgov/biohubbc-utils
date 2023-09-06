import _keycloakData from "./data_temp/keycloakData.json"
import { KeycloakService } from "./database/keycloak"
import axios from "axios"
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
      displayName: string[]
    }
  }
}

interface IKeycloakData {
  userData: IUser[]
}

enum SYSTEM_IDENTITY_SOURCE {
  DATABASE = "DATABASE",
  IDIR = "IDIR",
  BCEID_BASIC = "BCEIDBASIC",
  BCEID_BUSINESS = "BCEIDBUSINESS",
  UNVERIFIED = "UNVERIFIED",
}

enum SYSTEM_USER_ROLE_NAME {
  SYSTEM_ADMINISTRATOR = "System Administrator",
  CREATOR = "Creator",
  DATA_ADMINISTRATOR = "Data Administrator",
}

interface SystemUserSeed {
  userIdentifier: string
  identitySource: SYSTEM_IDENTITY_SOURCE
  role_name: SYSTEM_USER_ROLE_NAME
  userGuid: string
  displayName: string
  given_name: string
  family_name: string
  email: string
}

const getBackboneApiHost = () =>
  `http://${process.env.API_HOST}:${process.env.API_PORT}` ||
  "http://localhost:6200"

async function sendUserIntakeRequest(
  userIntakeUrl: string,
  systemUserSeed: SystemUserSeed,
  token: string
) {
  try {
    const { data } = await axios.post(userIntakeUrl, systemUserSeed, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })

    console.log("data", data)
  } catch (error) {
    console.log("error", error)
  }
}

/**
 * This is a temporary script to insert users into the database.
 *
 * few things to note:
 *  - the keycloakData.json file is a temporary file that contains the keycloak data for the users
 *  - the keycloakData.json file is not pushed to github
 *  - for each user in the keycloakData.json file, we will insert a user into the database
 *    - there are 3 types of users:
 *
 *     1. users with keycloak data: {
 *        userIdentifier: string
 *        identitySource: SYSTEM_IDENTITY_SOURCE.IDIR
 *        role_name: SYSTEM_USER_ROLE_NAME.CREATOR
 *        userGuid: string
 *        displayName: string
 *        given_name: string
 *        family_name: string
 *        email: string
 *     }
 *
 *     2. users no email:
 *        - these users will not be inserted into the database
 *
 *     3. user with email but no keycloak data: {
 *        userIdentifier: null
 *        identitySource: SYSTEM_IDENTITY_SOURCE.UNVERIFIED
 *        role_name: SYSTEM_USER_ROLE_NAME.CREATOR
 *        userGuid: null
 *        displayName: string
 *        given_name: string | null
 *        family_name: string | null
 *        email: string
 *     }
 *
 */
async function main() {
  //new keycloak copy service
  const keycloakService = new KeycloakService()

  //get token from keycloak
  let token = await keycloakService.getKeycloakServiceToken()

  if (!token) {
    console.log("no token")
    return
  }

  //get user intake url
  const userIntakeUrl = new URL("/user/add", getBackboneApiHost()).href

  //get user data from keycloak file
  const keycloakData: IKeycloakData = _keycloakData as IKeycloakData
  const userData = keycloakData.userData

  for (const user of userData) {
    //if no email, skip
    if (!user.EMAIL_ADDRESS) {
      continue
    }

    //if no keycloak data, insert user with unverified identity source
    const systemUserSeed: SystemUserSeed = {
      userIdentifier:
        user.keycloakData?.attributes.idir_username[0] ||
        `${user.FIRST_NAME} ${user.LAST_NAME}`,
      identitySource: user.keycloakData
        ? SYSTEM_IDENTITY_SOURCE.IDIR
        : SYSTEM_IDENTITY_SOURCE.UNVERIFIED,
      role_name: SYSTEM_USER_ROLE_NAME.CREATOR,
      userGuid: user.keycloakData?.attributes.idir_user_guid[0] || "",
      displayName:
        user.keycloakData?.attributes.displayName[0] ||
        `${user.FIRST_NAME} ${user.LAST_NAME}`,
      given_name: user.keycloakData?.firstName || user.FIRST_NAME || "",
      family_name: user.keycloakData?.lastName || user.LAST_NAME || "",
      email: user.keycloakData?.email || user.EMAIL_ADDRESS,
    }

    console.log("systemUserSeed", systemUserSeed)
    //insert user into database
    try {
      sendUserIntakeRequest(userIntakeUrl, systemUserSeed, token)
    } catch (error) {
      console.log("error", error)
      sendUserIntakeRequest(userIntakeUrl, systemUserSeed, token)
    }
  }
}

main()
