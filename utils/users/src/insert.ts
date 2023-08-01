import _keycloakData from "./data_temp/keycloakData.json"

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
  identifier: string | null
  type: SYSTEM_IDENTITY_SOURCE
  role_name: SYSTEM_USER_ROLE_NAME
  user_guid: string | null
  display_name: string
  given_name: string | null
  family_name: string | null
  email: string
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
 *        identifier: string
 *        type: SYSTEM_IDENTITY_SOURCE.IDIR
 *        role_name: SYSTEM_USER_ROLE_NAME.CREATOR
 *        user_guid: string
 *        display_name: string
 *        given_name: string
 *        family_name: string
 *        email: string
 *     }
 *
 *     2. users no email:
 *        - these users will not be inserted into the database
 *
 *     3. user with email but no keycloak data: {
 *        identifier: null
 *        type: SYSTEM_IDENTITY_SOURCE.UNVERIFIED
 *        role_name: SYSTEM_USER_ROLE_NAME.CREATOR
 *        user_guid: null
 *        display_name: string
 *        given_name: string | null
 *        family_name: string | null
 *        email: string
 *     }
 *
 */
async function main() {
  const keycloakData: IKeycloakData = _keycloakData as IKeycloakData

  const userData = keycloakData.userData
  for (const user of userData) {
    console.log("user", user)

    if (!user.EMAIL_ADDRESS) {
      continue
    }

    const systemUserSeed: SystemUserSeed = {
      identifier: user.keycloakData?.attributes.idir_username[0] || null,
      type: user.keycloakData
        ? SYSTEM_IDENTITY_SOURCE.IDIR
        : SYSTEM_IDENTITY_SOURCE.UNVERIFIED,
      role_name: SYSTEM_USER_ROLE_NAME.CREATOR,
      user_guid: user.keycloakData?.attributes.idir_user_guid[0] || null,
      display_name:
        user.keycloakData?.attributes.display_name[0] ||
        `${user.FIRST_NAME} ${user.LAST_NAME}`,
      given_name: user.keycloakData?.firstName || user.FIRST_NAME || null,
      family_name: user.keycloakData?.lastName || user.LAST_NAME || null,
      email: user.keycloakData?.email || user.EMAIL_ADDRESS,
    }

    console.log("systemUserSeed", systemUserSeed)
  }
}

main()
