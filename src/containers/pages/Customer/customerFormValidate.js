//Use i18next later
const requiredNameText = "Tên khách hàng bắt buộc";
const wrongEmailFormatText = "Sai định dạng email";

export const customerFormValidate = (values) => {
    const errors = {};
    if(!values.name) {
        errors.name = requiredNameText;
    }
    if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = wrongEmailFormatText;
    }
    return errors;
}
