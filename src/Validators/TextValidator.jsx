export default function TextValidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "icon":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value.length > 100)
                return name + " Field Length Must Be 3-100 Characters"
            else
                return ""

        case "shortDescription":
        case "answer":
        case "question":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 20 || value.length > 1000)
                return name + " Field Length Must Be 20-1000 Characters"
            else
                return ""

        default:
            return ""
    }
}
