import { put, takeEvery } from "redux-saga/effects"
import { CREATE_BRAND, CREATE_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("brand", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("brand", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_BRAND_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("brand")
    yield put({ type: GET_BRAND_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("brand", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("brand", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_BRAND_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("brand", action.payload)
    put({ type: DELETE_BRAND_RED, payload: action.payload })
}


export default function* BrandSagas() {
    yield takeEvery(CREATE_BRAND, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_BRAND, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_BRAND, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_BRAND, deleteSaga)                                        //Watcher Saga
}       