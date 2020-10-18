import UsersService from './UsersService';
const submitBtn = document.getElementById('submit');
const formEl = document.getElementsByTagName('form')[0];
const supportedTypes = ['text', 'password', 'email'];

const validator = {
    text(val) {
        return val.length > 0;
    },
    password(val) {
        return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(val);

    },
    email(val) {
        return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(val);
    }
}

const hasError = ({ name, value: originalValue, type, required }) => {
    const value = originalValue.trim ? originalValue.trim() : originalValue;
    if (!supportedTypes.includes(type)) {
        return 'Type is not suported';
    }
    if (!value) {
        return required ? `[${name}] field is mandatory` : false;
    }

    if (validator[type] && !validator[type](value)) {
        return `[${name}] field is incorrect`;
    }
    return false;
};
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputEl = formEl.getElementsByTagName('input');
    const payload = {};

    try {
        for (let i = 0; i < inputEl.length; i++) {
            const { value, type, required, name } = inputEl[i];
            const err = hasError({ name, value, type, required });
            if (err) {
                throw Error(err);
            }
            payload[name] = value;
        }
        UsersService.createUser(payload);
        return window.location = '/';

    } catch (err) {
        toastr.error(err);
    }
});