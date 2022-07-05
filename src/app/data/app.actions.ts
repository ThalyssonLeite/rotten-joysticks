import { createAction, props } from "@ngrx/store";

export const setChoosenCard = createAction('[Card] Set choosen card', props<{ game: any }>())
export const setRateModal = createAction('[Rate modal] Set visibility', props<{ visible: boolean }>())
