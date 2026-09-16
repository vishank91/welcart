import { put, takeEvery } from "redux-saga/effects"
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("maincategory", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("maincategory", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_MAINCATEGORY_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("maincategory")
    yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("maincategory", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("maincategory", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_MAINCATEGORY_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("maincategory", action.payload)
    put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}


export default function* MaincategorySagas() {
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_MAINCATEGORY, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)                                        //Watcher Saga
}       