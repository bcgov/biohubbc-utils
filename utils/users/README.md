# Biohub user import

## Static list of SPI users to collect keycloak information and insert into biohub db

### links

- https://apps.nrs.gov.bc.ca/int/jira/browse/SIMSBIOHUB-194
- https://apps.nrs.gov.bc.ca/int/jira/secure/attachment/137585/personsForSIMS.csv
- https://bcgov.github.io/sso-requests/my-dashboard/teams
- https://github.com/bcgov/sso-keycloak/wiki/CSS-API-Account
- https://nrs.objectstore.gov.bc.ca/gblhvt/postman/BioHub%20Collection%20V3.postman_environment.json
- https://nrs.objectstore.gov.bc.ca/gblhvt/postman/BioHub%20Collection%20V3.postman_collection.json


### Setup

- S3 bucket for Postman ENV/Collection

- SIMS CSS API Account data ( Not to be pushed here for dev use )
  - {
    "tokenUrl": "https://loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect/token",
    "clientId": "service-account-team-1190-4229",
    "clientSecret": "iOM77B5QqLXWoSa6RDXf7MoC0KiUGOO4"
    }
