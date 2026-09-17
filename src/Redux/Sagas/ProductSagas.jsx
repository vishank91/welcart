import { put, takeEvery } from "redux-saga/effects"
import { CREATE_PRODUCT, CREATE_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("product", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("product", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_PRODUCT_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("product")
    yield put({ type: GET_PRODUCT_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("product", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("product", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_PRODUCT_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("product", action.payload)
    put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}


export default function* ProductSagas() {
    yield takeEvery(CREATE_PRODUCT, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_PRODUCT, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_PRODUCT, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_PRODUCT, deleteSaga)                                        //Watcher Saga
}       