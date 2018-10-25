import callApi from './../../utils/callApi';

const GET_CUSTOMER_URL = "customers.json";
const FILTERED_CUSTOMER_URL = "customers-filteric.json";
const CUSTOMER_GROUP_URL = "groups.json";
const ADD_CUSTOMER_URL = "customers.json";
const DELETE_CUSTOMER_URL = "customers";
const EDIT_CUSTOMER_URL = "customers";


export const getAllCustomers = () => {
    const config = {
        method: 'GET'
    }
    return callApi(GET_CUSTOMER_URL, config);
}

export const loadCustomers = (data) => {
    const config = {
        method: 'POST',
        data
    }
    return callApi(FILTERED_CUSTOMER_URL, config);
};

export const addCustomer = (data) => {
    const config = {
        method: 'POST',
        data
    }
    return callApi(ADD_CUSTOMER_URL, config);
}

export const editCustomer = (data) => {
    const config = {
        method: 'PUT',
        data
    }
    return callApi(`${EDIT_CUSTOMER_URL}/${data.customer.id}.json`, config);
}

export const loadCustomerGroup = () => {
    const config = {
        method: 'GET',
    }
    return callApi(CUSTOMER_GROUP_URL, config);
}

export const deleteCustomer = (data) => {
    const config = {
        method: 'DELETE',
    }
    return callApi(`${DELETE_CUSTOMER_URL}/${data.id}.json`, config);
}
