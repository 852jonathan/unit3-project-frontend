import produce from 'immer'

import {
  SET_PRODUCTLIST,
  GET_PRODUCTLIST
} from '@/actions/product/'

const initialState = {
  meta: null,
  list: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTLIST: {
      return produce(state, (draft) => {
        draft.list = action.payload.product
        draft.meta = action.payload.meta
      })
    }
    case GET_PRODUCTLIST: {
      return produce(state, (draft) => {
        draft.isLoading = action.payload.loading
      })
    }
    default: {
      return state
    }
  }
}
