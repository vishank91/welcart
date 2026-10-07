import { put, takeEvery } from "redux-saga/effects"
import { CREATE_NEWSLETTER, CREATE_NEWSLETTER_RED, DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED, GET_NEWSLETTER, GET_NEWSLETTER_RED, UPDATE_NEWSLETTER, UPDATE_NEWSLETTER_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("newsletter", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("newsletter", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_NEWSLETTER_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("newsletter")
    yield put({ type: GET_NEWSLETTER_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("newsletter", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_NEWSLETTER_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("newsletter", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_NEWSLETTER_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("newsletter", action.payload)
    put({ type: DELETE_NEWSLETTER_RED, payload: action.payload })
}


export default function* NewsletterSagas() {
    yield takeEvery(CREATE_NEWSLETTER, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_NEWSLETTER, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_NEWSLETTER, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_NEWSLETTER, deleteSaga)                                        //Watcher Saga
}       