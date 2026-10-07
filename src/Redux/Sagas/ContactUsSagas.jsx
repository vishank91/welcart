import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CONTACT_US, CREATE_CONTACT_US_RED, DELETE_CONTACT_US, DELETE_CONTACT_US_RED, GET_CONTACT_US, GET_CONTACT_US_RED, UPDATE_CONTACT_US, UPDATE_CONTACT_US_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("contactus", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("contactus", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_CONTACT_US_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("contactus")
    yield put({ type: GET_CONTACT_US_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("contactus", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_CONTACT_US_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("contactus", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_CONTACT_US_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("contactus", action.payload)
    put({ type: DELETE_CONTACT_US_RED, payload: action.payload })
}


export default function* ContactUsSagas() {
    yield takeEvery(CREATE_CONTACT_US, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_CONTACT_US, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_CONTACT_US, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_CONTACT_US, deleteSaga)                                        //Watcher Saga
}       