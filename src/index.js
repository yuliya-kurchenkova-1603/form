import { fields } from './table.json';
import UsersService from './UsersService';

const users = UsersService.getUsers();
createTable(users, fields);

function createTable(data, fields) {
    const tableEl = document.createElement('table');
    const theadEL = document.createElement('thead');
    const tbodyEl = document.createElement('tbody');
    const theadRowEl = document.createElement('tr');


    for (let i = 0; i < fields.length; i++) {
        const th = document.createElement('th');
        th.innerText = fields[i].label;
        theadRowEl.appendChild(th);
    }

    theadEL.appendChild(theadRowEl);

    for (let i = 0; i < data.length; i++) {
        const tbodyRow = document.createElement('tr');

        for (let j = 0; j < fields.length; j++) {
            const td = document.createElement('td');
            const paramId = fields[j].id;
            const value = data[i][paramId];

            if (value !== undefined) {
                td.innerText = value;
            }


            tbodyRow.appendChild(td);
        }

        tbodyEl.appendChild(tbodyRow);
    }

    tableEl.appendChild(theadEL);
    tableEl.appendChild(tbodyEl);

    const rootEl = document.getElementById('root');
    rootEl.appendChild(tableEl);
}