import fs from "fs";

const summaryDirectory = "./utils/templates/summary/sql"
const observationDirectory = "./utils/templates/observations/sql"


const readFileToString = async (path: string, fileName: string): Promise<Buffer> => {
  const fullPath = `${path}/${fileName}.sql`;
  return await fs.readFileSync(fullPath);
}

/* OBSERVATIONS */
const ELK_GENERAL = readFileToString(observationDirectory, "elk_general_upsert.sql");
const ELK_SRB = readFileToString(observationDirectory, "elk_srb_upsert.sql");
const GOAT_TOTAL_COUNT = readFileToString(observationDirectory, "Goat_Aerial_Population_Total_Count_Recuit_Comp_Survey_2.0_Upsert_SQL.sql")
const SHEEP_TOTAL_COUNT = readFileToString(observationDirectory, "sheep_total_count_upsert.sql");

/* SUMMARY */
const CARIBOU_SUMMARY = readFileToString(summaryDirectory, "Caribou_Summary_Results_UPSERT.sql")
const ELK_SUMMARY = readFileToString(summaryDirectory, "Elk_Summary_Results_UPSERT.sql")
const GOAT_SUMMARY = readFileToString(summaryDirectory, "Goat_Summary_Results_UPSERT.sql")
const MOOSE_SUMMARY = readFileToString(summaryDirectory, "Moose_Summary_Results_UPSERT.sql")
const SHEEP_SUMMARY = readFileToString(summaryDirectory, "Sheep_Summary_Results_UPSERT.sql")


export {
  ELK_GENERAL,
  ELK_SRB,
  GOAT_TOTAL_COUNT,
  SHEEP_TOTAL_COUNT,
  CARIBOU_SUMMARY,
  ELK_SUMMARY,
  GOAT_SUMMARY,
  MOOSE_SUMMARY,
  SHEEP_SUMMARY
}