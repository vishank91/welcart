import { put, takeEvery } from "redux-saga/effects"
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("feature", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("feature", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_FEATURE_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("feature")
    yield put({ type: GET_FEATURE_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("feature", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("feature", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_FEATURE_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("feature", action.payload)
    put({ type: DELETE_FEATURE_RED, payload: action.payload })
}


export default function* FeatureSagas() {
    yield takeEvery(CREATE_FEATURE, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_FEATURE, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_FEATURE, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_FEATURE, deleteSaga)                                        //Watcher Saga
}       