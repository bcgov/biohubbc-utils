export const caribouTest1 = async () => {
  const { testTransform, testValidate } = await import(
    './observations/caribou/aerial-population-total-count-recruitment-composition-survey/2.1'
  );

  testValidate('Central Selkirks Caribou_Aerial_Population_Total_Count_Recuit_Comp_Survey_1.0.xlsx');
  testTransform('Central Selkirks Caribou_Aerial_Population_Total_Count_Recuit_Comp_Survey_1.0.xlsx');
};

export const elkTest1 = async () => {
  const { testTransform, testValidate } = await import(
    './observations/elk/elk-aerial-srb-recruitment-composition-survey/2.1'
  );

  testValidate('Elk_Peace Region MU720A_SRB_Survey_2.0_test_data.xlsx');
  testTransform('Elk_Peace Region MU720A_SRB_Survey_2.0_test_data.xlsx');
};

export const elkTest2 = async () => {
  const { testTransform, testValidate } = await import(
    './observations/elk/elk-aerial-srb-recruitment-composition-survey/2.1'
  );

  testValidate('Elk_WestKootenay_Composition_Surveys_2.0_test_data.xlsx');
  testTransform('Elk_WestKootenay_Composition_Surveys_2.0_test_data.xlsx');
};

export const elkTest3 = async () => {
  const { testTransform, testValidate } = await import(
    './observations/elk/elk-aerial-srb-recruitment-composition-survey/2.1'
  );

  testValidate('Elk_StewarshipCounts_Kootenay_Ground_Transect_2.0_test_data.xlsx');
  testTransform('Elk_StewarshipCounts_Kootenay_Ground_Transect_2.0_test_data.xlsx');
};

export const goatTest1 = async () => {
  const { testTransform, testValidate } = await import(
    './observations/goat/aerial-population-total-count-recruitment-composition-survey/2.1'
  );

  testValidate('Monashee_Mt_Goat_Total_Count_Recuit_Comp_Survey_2.0.xlsx');
  testTransform('Monashee_Mt_Goat_Total_Count_Recuit_Comp_Survey_2.0.xlsx');
};

export const mooseTest1 = async () => {
  const { testTransform, testValidate } = await import(
    './observations/moose/aerial-general-recruitment-composition-survey/2.1'
  );

  testValidate('Moose_Aerial_General_Recruit_Comp_Survey_2.0_Test_Data.xlsx');
  testTransform('Moose_Aerial_General_Recruit_Comp_Survey_2.0_Test_Data.xlsx');
};

export const mooseTest2 = async () => {
  const { testTransform, testValidate } = await import(
    './observations/moose/aerial-srb-recruitment-composition-survey/2.1'
  );

  testValidate('Moose_Aerial_StratifiedRandomBlock_Recruit_Comp_Survey_2.0_Test_Data.xlsx');
  testTransform('Moose_Aerial_StratifiedRandomBlock_Recruit_Comp_Survey_2.0_Test_Data.xlsx');
};

export const mooseTest3 = async () => {
  const { testTransform, testValidate } = await import(
    './observations/moose/aerial-transect-distance-sampling-survey/2.1'
  );

  testValidate('Moose_Aerial_Transect_Distance_Sampling_Survey_2.0_Test_Data.xlsx');
  testTransform('Moose_Aerial_Transect_Distance_Sampling_Survey_2.0_Test_Data.xlsx');
};

export const sheepTest1 = async () => {
  const { testTransform, testValidate } = await import(
    './observations/sheep/aerial-population-total-count-recruitment-composition/2.1'
  );

  testValidate('EastKootenay_Sheep_Aerial_Total_Count_2.0.xlsx');
  testTransform('EastKootenay_Sheep_Aerial_Total_Count_2.0.xlsx');
};

// Run Tests
elkTest1();
mooseTest2();
