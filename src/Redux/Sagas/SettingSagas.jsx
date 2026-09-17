import { put, takeEvery } from "redux-saga/effects"
import { CREATE_SETTING, CREATE_SETTING_RED, DELETE_SETTING, DELETE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("setting", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("setting", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_SETTING_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("setting")
    yield put({ type: GET_SETTING_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("setting", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_SETTING_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("setting", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_SETTING_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("setting", action.payload)
    put({ type: DELETE_SETTING_RED, payload: action.payload })
}


export default function* SettingSagas() {
    yield takeEvery(CREATE_SETTING, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_SETTING, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_SETTING, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_SETTING, deleteSaga)                                        //Watcher Saga
}       