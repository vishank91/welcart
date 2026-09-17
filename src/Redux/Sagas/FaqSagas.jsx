import { put, takeEvery } from "redux-saga/effects"
import { CREATE_FAQ, CREATE_FAQ_RED, DELETE_FAQ, DELETE_FAQ_RED, GET_FAQ, GET_FAQ_RED, UPDATE_FAQ, UPDATE_FAQ_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("faq", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("faq", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_FAQ_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("faq")
    yield put({ type: GET_FAQ_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("faq", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_FAQ_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("faq", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_FAQ_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("faq", action.payload)
    put({ type: DELETE_FAQ_RED, payload: action.payload })
}


export default function* FaqSagas() {
    yield takeEvery(CREATE_FAQ, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_FAQ, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_FAQ, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_FAQ, deleteSaga)                                        //Watcher Saga
}       