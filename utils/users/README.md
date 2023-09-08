# Biohub user import

## Static list of SPI users to collect keycloak information and insert into biohub db

### links

- https://apps.nrs.gov.bc.ca/int/jira/browse/SIMSBIOHUB-194
- https://apps.nrs.gov.bc.ca/int/jira/secure/attachment/137585/personsForSIMS.csv
- https://bcgov.github.io/sso-requests/my-dashboard/teams
- https://github.com/bcgov/sso-keycloak/wiki/CSS-API-Account
- https://nrs.objectstore.gov.bc.ca/gblhvt/postman/BioHub%20Collection%20V3.postman_environment.json
- https://nrs.objectstore.gov.bc.ca/gblhvt/postman/BioHub%20Collection%20V3.postman_collection.json


## Collect IDIR information from given list
 - This script takes in an input file and checks each email and full name if they exist in the IDIR environment.
    - If they do that info is all saved into a file called `keycloakData.json``

    - A `.env` is required to run both scripts
    - Input data saved proper location 
        - `../data_temp/personsForSIMS.csv` 
    - run `npm run users`

## Insert user data into SIMS
 - This script sends each user data collected above `keycloakData.json` to a SIMS api endpoint
 - SIMS api url and Auth requirements are are stored in the `.env` file
 - run `npm run insert` to start insert script


