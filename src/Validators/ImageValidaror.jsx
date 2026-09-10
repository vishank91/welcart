
export default function ImageValidaror(e) {
    if (e.target.files.length === 1) {
        let pic = e.target.files[0]
        console.log(pic)
        if (!["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"].includes(pic.type))
            return "Invalid Pic Format Allowd Formats are .jpg,.jpeg,.png,.gif"
        else if (pic.size > 1048576)
            return "Pic Size is Too Heavy Please upload an image upto 1 mb"
        else
            return ""
    }
}
