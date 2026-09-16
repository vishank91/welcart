//CREATE API CALLING SERVICE : if payload has no file field, contains only ascii characters
export async function createRecordAPI(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...payload })
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//CREATE API CALLING SERVICE : if payload has file field
export async function createMultipartRecordAPI(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "POST",
            headers: {
            },
            body: payload
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}


//GET API CALLING SERVICE
export async function getRecordAPI(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}


//UPDATE API CALLING SERVICE : if payload has no file field, contains only ascii characters
export async function updateRecordAPI(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...payload })
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//UPDATE API CALLING SERVICE : if payload has file field
export async function updateMultipartRecordAPI(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.get("id")}`, {
            method: "PUT",
            headers: {
            },
            body: payload
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}


//DELETE API CALLING SERVICE
export async function deleteRecordAPI(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...payload })
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}