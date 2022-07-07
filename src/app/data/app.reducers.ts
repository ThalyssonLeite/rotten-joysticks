import { createReducer, on } from "@ngrx/store"
import * as Actions from './app.actions';

const cardState = {
  game: {},
}

const rateModalState = {
  visible: false,
}

const deletionModalState = {
  visible: false,
}

const headerState = 'Login';

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

const DeletionModalReducer = createReducer(
  deletionModalState,
  on(Actions.setDeletionModal, (state, { visible }) => ({
    ...state,
    visible
  }))
);

const headerReducer = createReducer(
  headerState,
  on(Actions.setHeaderMenuLabel, (state, { label }) => (label))
);

export {
  cardReducer as card,
  rateModalReducer as rateModal,
  DeletionModalReducer as deletionModal,
  headerReducer as header,
}
