import { testTransform as mooseTestTransform } from './observations/moose/aerial-transect-distance-sampling-survey/2.1';
import { testValidate as sheepTestValidate } from './observations/sheep/aerial-population-total-count-recruitment-composition/2.1';

console.debug('[test validate] - sheep - aerial-population-total-count-recruitment-composition - 2.1');
sheepTestValidate('mini_EastKootenay_Sheep_Aerial_Total_Count_2.0.xlsx');
// console.debug('[test transform] - sheep - aerial-population-total-count-recruitment-composition - 2.1');
// sheepTestTransform('mini_EastKootenay_Sheep_Aerial_Total_Count_2.0.xlsx');

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

console.debug('[test transform] - moose - aerial-transect-distance-sampling-survey - 2.1');
mooseTestTransform('Moose_Aerial_Transect_Distance_Sampling_Survey_2.0_Test_Data.xlsx');
