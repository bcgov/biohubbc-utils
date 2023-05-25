export const caribouTest1 = async () => {
  console.debug('caribouTest1');

  const { testTransform, testValidate } = await import(
    './observations/caribou/aerial-population-total-count-recruitment-composition-survey/2.1'
  );

  await testValidate('Central Selkirks Caribou_Aerial_Population_Total_Count_Recuit_Comp_Survey_1.0.xlsx');
  await testTransform('Central Selkirks Caribou_Aerial_Population_Total_Count_Recuit_Comp_Survey_1.0.xlsx');
};

export const elkTest1 = async () => {
  console.debug('elkTest1');

  const { testTransform, testValidate } = await import(
    './observations/elk/elk-aerial-srb-recruitment-composition-survey/2.1'
  );

  await testValidate('Elk_Peace Region MU720A_SRB_Survey_2.0_test_data.xlsx');
  await testTransform('Elk_Peace Region MU720A_SRB_Survey_2.0_test_data.xlsx');
};

export const elkTest2 = async () => {
  console.debug('elkTest2');

  const { testTransform, testValidate } = await import(
    './observations/elk/elk-aerial-srb-recruitment-composition-survey/2.1'
  );

  await testValidate('Elk_WestKootenay_Composition_Surveys_2.0_test_data.xlsx');
  await testTransform('Elk_WestKootenay_Composition_Surveys_2.0_test_data.xlsx');
};

export const elkTest3 = async () => {
  console.debug('elkTest3');

  const { testTransform, testValidate } = await import(
    './observations/elk/elk-aerial-srb-recruitment-composition-survey/2.1'
  );

  await testValidate('Elk_StewarshipCounts_Kootenay_Ground_Transect_2.0_test_data.xlsx');
  await testTransform('Elk_StewarshipCounts_Kootenay_Ground_Transect_2.0_test_data.xlsx');
};

export const goatTest1 = async () => {
  console.debug('goatTest1');

  const { testTransform, testValidate } = await import(
    './observations/goat/aerial-population-total-count-recruitment-composition-survey/2.1'
  );

  await testValidate('Monashee_Mt_Goat_Total_Count_Recuit_Comp_Survey_2.0.xlsx');
  await testTransform('Monashee_Mt_Goat_Total_Count_Recuit_Comp_Survey_2.0.xlsx');
};

export const mooseTest1 = async () => {
  console.debug('mooseTest1');

  const { testTransform, testValidate } = await import(
    './observations/moose/aerial-general-recruitment-composition-survey/2.1'
  );

  await testValidate('Moose_Aerial_General_Recruit_Comp_Survey_2.0_Test_Data.xlsx');
  await testTransform('Moose_Aerial_General_Recruit_Comp_Survey_2.0_Test_Data.xlsx');
};

export const mooseTest2 = async () => {
  console.debug('mooseTest2');

  const { testTransform, testValidate } = await import(
    './observations/moose/aerial-srb-recruitment-composition-survey/2.1'
  );

  await testValidate('Moose_Aerial_StratifiedRandomBlock_Recruit_Comp_Survey_2.0_Test_Data.xlsx');
  await testTransform('Moose_Aerial_StratifiedRandomBlock_Recruit_Comp_Survey_2.0_Test_Data.xlsx');
};

export const mooseTest3 = async () => {
  console.debug('mooseTest3');

  const { testTransform, testValidate } = await import(
    './observations/moose/aerial-transect-distance-sampling-survey/2.1'
  );

  await testValidate('Moose_Aerial_Transect_Distance_Sampling_Survey_2.0_Test_Data.xlsx');
  await testTransform('Moose_Aerial_Transect_Distance_Sampling_Survey_2.0_Test_Data.xlsx');
};

export const sheepTest1 = async () => {
  console.debug('sheepTest1');

  const { testTransform, testValidate } = await import(
    './observations/sheep/aerial-population-total-count-recruitment-composition/2.1'
  );

  await testValidate('EastKootenay_Sheep_Aerial_Total_Count_2.0.xlsx');
  await testTransform('EastKootenay_Sheep_Aerial_Total_Count_2.0.xlsx');
};

// Specify which tests to run
const testsToRun = async () => {
  await elkTest1();
  await mooseTest2();
};

// Run the tests
testsToRun();
