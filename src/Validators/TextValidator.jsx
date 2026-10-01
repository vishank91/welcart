import PasswordValidator from "password-validator"

var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have at least 1 uppercase letter
    .has().lowercase(1)                             // Must have at least 1 lowercase letter
    .has().digits(1)                                // Must have at least 1 digit
    .has().symbols(1)                               // Must have at least 1 special character
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export default function TextValidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "username":
        case "icon":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value.length > 100)
                return name + " Field Length Must Be 3-100 Characters"
            else
                return ""

        case "email":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 13 || value.length > 100)
                return name + " Field Length Must Be 13-100 Characters"
            else
                return ""

        case "phone":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 10 || value.length > 10)
                return name + " Field Length Must Be 10"
            else if (!["6", "7", "8", "9"].includes(value[0]))
                return "Invalid Phone Number, Phone Number Must Start With 6,7,8 or 9"
            else
                return ""

        case "password":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (!schema.validate(value))
                return schema.validate(value, { details: true }).map(x => x.message.replaceAll("string", "password"))
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

        case "basePrice":
            if (!value || value.length === 0)
                return "Base Price Field is Mendatory"
            else if (parseInt(value) < 1)
                return "Base Price Must Be Greater Then 0"
            else
                return ""

        case "discount":
            if (!value || value.length === 0)
                return "Discount Field is Mendatory"
            else if (parseInt(value) < 0 || parseInt(value) > 100)
                return "Discount Must Be 0-100"
            else
                return ""

        case "stockQuantity":
            if (!value || value.length === 0)
                return "Stock Quantity Field is Mendatory"
            else if (parseInt(value) < 0)
                return "Stock Quantity Must Be 0 or Greater Then 0"
            else
                return ""

        default:
            return ""
    }
}
