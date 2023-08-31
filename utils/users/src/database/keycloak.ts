import axios from "axios"
import qs from "qs"

type IDIRAttributes = {
  idir_user_guid: [string]
  idir_username: [string]
  display_name: [string]
  given_name: [string]
  family_name: [string]
}

interface BCEIDBasicAttributes {
  bceid_user_guid: [string]
  bceid_username: [string]
}

type BCEIDBusinessAttributes = BCEIDBasicAttributes & {
  bceid_business_guid: [string]
  bceid_business_name: [string]
  display_name: [string]
}

export type KeycloakUser = {
  username: string
  email: string
  firstName: string
  lastName: string
  attributes: IDIRAttributes | BCEIDBusinessAttributes
}

/**
 * Service for calling the Keycloak Gold Standard CSS API.
 *
 * API Swagger Doc: https://api.loginproxy.gov.bc.ca/openapi/swagger#/Users/get__environment__basic_business_bceid_users
 *
 * @export
 * @class KeycloakService
 */
export class KeycloakService {
  // Used to authenticate with the SIMS Service Credentials
  keycloakHost: string
  keycloakServiceClientId: string
  keycloakServiceClientSecret: string

  // Used to authenticate with the CSS API using the SIMS API credentials
  keycloakApiTokenUrl: string
  keycloakApiClientId: string
  keycloakApiClientSecret: string

  // Used to query the CSS API
  keycloakApiHost: string
  keycloakIntegrationId: string
  keycloakEnvironment: string

  constructor() {
    this.keycloakHost = `${process.env.KEYCLOAK_HOST}`
    this.keycloakServiceClientId = `${process.env.KEYCLOAK_ADMIN_USERNAME}`
    this.keycloakServiceClientSecret = `${process.env.KEYCLOAK_ADMIN_PASSWORD}`

    this.keycloakApiTokenUrl = `${process.env.KEYCLOAK_API_TOKEN_URL}`
    this.keycloakApiClientId = `${process.env.KEYCLOAK_API_CLIENT_ID}`
    this.keycloakApiClientSecret = `${process.env.KEYCLOAK_API_CLIENT_SECRET}`

    this.keycloakApiHost = `${process.env.KEYCLOAK_API_HOST}`
    this.keycloakIntegrationId = `${process.env.KEYCLOAK_INTEGRATION_ID}`
    this.keycloakEnvironment = `${process.env.KEYCLOAK_ENVIRONMENT}`
  }

  /**
   * Get an access token from keycloak for the SIMS Service account.
   *
   * @return {*}  {Promise<string>}
   * @memberof KeycloakService
   */
  async getKeycloakServiceToken(): Promise<string | undefined> {
    try {
      const { data } = await axios.post(
        `${this.keycloakHost}/realms/standard/protocol/openid-connect/token`,
        qs.stringify({
          grant_type: "client_credentials",
          client_id: this.keycloakServiceClientId,
          client_secret: this.keycloakServiceClientSecret,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      return data.access_token as string
    } catch (error) {
      console.log("error", error)
    }
  }

  /**
   * Get an access token from keycloak for the sims-team account user.
   *
   * @return {*}  {Promise<string>}
   * @memberof KeycloakService
   */
  async getKeycloakToken(): Promise<string | undefined> {
    try {
      const { data } = await axios.post(
        this.keycloakApiTokenUrl,
        qs.stringify({
          grant_type: "client_credentials",
          client_id: this.keycloakApiClientId,
          client_secret: this.keycloakApiClientSecret,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      return data.access_token as string
    } catch (error) {
      console.log("error", error)
    }
  }
}
