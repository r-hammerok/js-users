'use strict';

const
    appData = {
        users: [
            {
                firstName: 'Roman',
                lastName: 'Ivannikov',
                login: 'roman77',
                password: '12345',
                regdate: '15 февраля 2021 г., 08:01:01'
            },
            {
                firstName: 'Ivan',
                lastName: 'Ivannikov',
                login: 'roman77',
                password: '12345',
                regdate: '15 февраля 2021 г., 08:01:01'
            }
        ],

        render: function() {
            appData.users.forEach(function(item) {
                const info = 'Имя: ' + item.firstName + ', фамилия: ' + item.lastName +
                        ', зарегистрирован: ' + item.regdate;
                document.getElementById('list').insertAdjacentHTML('beforeend',`<li>${info}</li>`);
            });
        }
    };

    appData.render();