import { createReducer, on } from "@ngrx/store"
import * as Actions from './app.actions';

const cardState = {
  game: {},
}

const rateModalState = {
  visible: false,
}

const cardReducer = createReducer(
  cardState,
  on(Actions.setChoosenCard, (state, { game }) => ({
    ...state,
    game
  }))
);

const rateModalReducer = createReducer(
  rateModalState,
  on(Actions.setRateModal, (state, { visible }) => ({
    ...state,
    visible
  }))
);

export {
  cardReducer as card,
  rateModalReducer as rateModal,
}
