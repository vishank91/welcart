import { put, takeEvery } from "redux-saga/effects"
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("subcategory", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("subcategory", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_SUBCATEGORY_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("subcategory")
    yield put({ type: GET_SUBCATEGORY_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("subcategory", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("subcategory", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_SUBCATEGORY_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("subcategory", action.payload)
    put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}


export default function* SubcategorySagas() {
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_SUBCATEGORY, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)                                        //Watcher Saga
}       