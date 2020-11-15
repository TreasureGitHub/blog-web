import apiConfig from "config";

/**
 * @author ffl.lff
 * @date 2020/2/2
 */
const {
  tag: {
    listTag,
    deleteTagById,
    createTag,
    updateTagById,
  }
} = apiConfig

export default {

  namespace: 'tag',

  state: {
    tagList: [],
    tagTotal: 0,
  },

  effects: {
    * listTag({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(listTag, payload);

      if (response && response.__code__ === 0) {
        const {data, total} = response

        yield put({
          type: 'save',
          payload: {
            tagList: data,
            tagTotal: total
          }
        })
      }
    },

    * deleteTagById({payload}, {call}) {
      return yield call(createTag, payload)
    },

    * createTag({payload}, {call}) {
      return yield call(createTag, payload)
    },

    * updateTagById({payload}, {call}) {
      return yield call(updateTagById)
    }

  },

  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },

};
