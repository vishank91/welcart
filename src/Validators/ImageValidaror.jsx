
export default function ImageValidaror(e) {
    if (e.target.files.length === 1) {
        let pic = e.target.files[0]
        if (!["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"].includes(pic.type))
            return "Invalid Pic Format Allowd Formats are .jpg,.jpeg,.png,.gif"
        else if (pic.size > 1048576)
            return "Pic Size is Too Heavy Please upload an image upto 1 mb"
        else
            return ""
    }
    else {
        let errorMessage = []
        Array.from(e.target.files).forEach((pic, index) => {
            if (!["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"].includes(pic.type))
                errorMessage.push(`Invalid Pic${index + 1} Format Allowd Formats are .jpg,.jpeg,.png,.gif`)
            else if (pic.size > 1048576)
                errorMessage.push(`Pic${index + 1} Size is Too Heavy Please upload an image upto 1 mb`)
        })
        return errorMessage.length === 0 ? "" : errorMessage.join("|")
    }
}
