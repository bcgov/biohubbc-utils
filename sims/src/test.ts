import { testValidate as caribouTestValidate1 } from './observations/caribou/aerial-population-total-count-recruitment-composition-survey/2.1';
import { testValidate as elkTestValidate1 } from './observations/elk/elk-aerial-srb-recruitment-composition-survey/2.1';
import { testValidate as elkTestValidate2 } from './observations/elk/elk-general-recruitment-composition-survey/2.1';
import { testValidate as elkTestValidate3 } from './observations/elk/elk-ground-transect-recruitment-composition-survey/2.1';
import { testValidate as goatTestValidate1 } from './observations/goat/aerial-population-total-count-recruitment-composition-survey/2.1';
import { testValidate as mooseTestValidate1 } from './observations/moose/aerial-general-recruitment-composition-survey/2.1';
import { testValidate as mooseTestValidate2 } from './observations/moose/aerial-srb-recruitment-composition-survey/2.1';
import { testValidate as mooseTestValidate3 } from './observations/moose/aerial-transect-distance-sampling-survey/2.1';
import { testValidate as sheepTestValidate1 } from './observations/sheep/aerial-population-total-count-recruitment-composition/2.1';

// Test Transformations

//-------------------
// console.debug('[test transform] - sheep - aerial-population-total-count-recruitment-composition - 2.1');
// sheepTestTransform('mini_EastKootenay_Sheep_Aerial_Total_Count_2.0.xlsx');

//-------------------
// console.debug('[test transform] - sheep - aerial-population-total-count-recruitment-composition - 2.1');
// testTransform('mini_EastKootenay_Sheep_Aerial_Total_Count_2.0.xlsx');

//-------------------
// import { testTransform } from './observations/elk/elk-general-recruitment-composition-survey/2.1';
// console.debug('[test transform] - elk - elk-general-recruitment-composition-survey - 2.1');
// testTransform('Mini_Elk_WestKootenay_Composition_Surveys_2.0_test_data.xlsx');

//-------------------
// import { testTransform } from './observations/goat/aerial-population-total-count-recruitment-composition-survey/2.1';
// console.debug('[test transform] - goat - aerial-population-total-count-recruitment-composition - 2.1');
// testTransform('Goat_test.xlsx');

//---------------------
// import { testTransform } from './observations/moose/aerial-general-recruitment-composition-survey/2.1';
// console.debug('[test transform] - moose - aerial-general-recruitment-composition-survey - 2.1');
// testTransform('Moose_Aerial_General_Recruit_Comp_Survey_2.0_Test_Data.xlsx');

//-----------------------
// console.debug('[test transform] - moose - aerial-transect-distance-sampling-survey - 2.1');
// mooseTestTransform('Moose_Aerial_Transect_Distance_Sampling_Survey_2.0_Test_Data.xlsx');

// Test Validations

console.log('caribou - aerial-population-total-count-recruitment-composition-survey - 2.1');
caribouTestValidate1('Central Selkirks Caribou_Aerial_Population_Total_Count_Recuit_Comp_Survey_1.0.xlsx');

console.log('elk - elk-aerial-srb-recruitment-composition-survey - 2.1');
elkTestValidate1('Elk_Peace Region MU720A_SRB_Survey_2.0_test_data.xlsx');
console.log('elk - elk-general-recruitment-composition-survey - 2.1');
elkTestValidate2('Elk_WestKootenay_Composition_Surveys_2.0_test_data.xlsx');
console.log('elk - elk-ground-transect-recruitment-composition-survey - 2.1');
elkTestValidate3('Elk_StewarshipCounts_Kootenay_Ground_Transect_2.0_test_data.xlsx');

console.log('goat - aerial-population-total-count-recruitment-composition-survey - 2.1');
goatTestValidate1('Monashee_Mt_Goat_Total_Count_Recuit_Comp_Survey_2.0.xlsx');

console.log('moose - aerial-general-recruitment-composition-survey - 2.1');
mooseTestValidate1('Moose_Aerial_General_Recruit_Comp_Survey_2.0_Test_Data.xlsx');
console.log('moose - aerial-srb-recruitment-composition-survey - 2.1');
mooseTestValidate2('Moose_Aerial_StratifiedRandomBlock_Recruit_Comp_Survey_2.0_Test_Data.xlsx');
console.log('moose - aerial-transect-distance-sampling-survey - 2.1');
mooseTestValidate3('Moose_Aerial_Transect_Distance_Sampling_Survey_2.0_Test_Data.xlsx');

console.log('sheep - aerial-population-total-count-recruitment-composition - 2.1');
sheepTestValidate1('EastKootenay_Sheep_Aerial_Total_Count_2.0.xlsx');
