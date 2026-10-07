import { put, takeEvery } from "redux-saga/effects"
import { CREATE_USER, CREATE_USER_RED, DELETE_USER, DELETE_USER_RED, GET_USER, GET_USER_RED, UPDATE_USER, UPDATE_USER_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("user", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("user", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_USER_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("user")
    yield put({ type: GET_USER_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("user", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_USER_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("user", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_USER_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("user", action.payload)
    put({ type: DELETE_USER_RED, payload: action.payload })
}


export default function* UserSagas() {
    yield takeEvery(CREATE_USER, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_USER, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_USER, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_USER, deleteSaga)                                        //Watcher Saga
}       