import { generateId } from './helper';
const getUsers = () => {
    try {
        const data = localStorage.getItem('users');
        return JSON.parse(data);
    } catch (err) {
        toastr.error('Error fetching data');
    }
};
const createUser = (user) => {
    try {
        const users = getUsers() || [];
        users.push({
            ...user,
            id: generateId(10),

        });
        localStorage.setItem('users', JSON.stringify(users));
        toastr.error('User created');
    } catch (err) {
        toastr.error('Error fetching data');
    }
};
export default {
    getUsers,
    createUser,
};