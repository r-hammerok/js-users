'use strict';

const
    appData = {
        users: [],
        curUserIndex: -1,

        render: function() {
            const
                list = document.getElementById('list'),
                username = document.getElementById('username');
            
            if (appData.curUserIndex === -1) {
                username.innerText = 'Аноним';
            } else {
                username.innerText = appData.users[appData.curUserIndex].firstName; 
            }

            // Очищаем список
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            appData.users.forEach(function(item, index) {
                const info = 'Имя: ' + item.firstName + ', фамилия: ' + item.lastName +
                        ', зарегистрирован: ' + item.regdate,
                      newLi = document.createElement('li');
                newLi.innerHTML = `${info}<button class="user-remove">x</button>`;
                list.insertAdjacentElement('beforeend', newLi);
                newLi.querySelector('.user-remove').addEventListener('click', function() {
                    appData.users.splice(index, 1);
                    appData.saveData();
                });
            });
        },

        saveData: function() {
            appData.setInStorage();
            appData.render();
        },

        regUser: function() {
            let userName, userLogin, userPassword;

            do {
                userName = prompt('Введите фамилию и имя (два слова через пробел!');
                if (userName === null) {
                    return;
                }
                userName = userName.trim().split(' ');
            } while (userName.length !== 2);
            
            do {
                userLogin = prompt('Введите логин');
                if (userLogin === null) {
                    return;
                }
                userLogin = userLogin.trim();
            } while (!userLogin);

            userPassword = prompt('Введите пароль');
            if (userPassword === null) {
                return;
            }
               
            appData.users.push({
                firstName: userName[1],
                lastName: userName[0],
                login: userLogin,
                password: userPassword,
                regdate: new Date().toLocaleString('ru', 
                    {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    })
            });
            appData.saveData();
        },

        loginUser: function() {
            const userLogin = prompt('Логин');
            if (userLogin === null) {
                return;
            }
            const userPassword = prompt('Пароль');
            if (userPassword === null) {
                return;
            }

            appData.curUserIndex = -1;
            appData.users.forEach(function(item, index) {
                if (item.login === userLogin && item.password === userPassword) {
                    appData.curUserIndex = index;
                    return;
                }
            });
            if (appData.curUserIndex === -1) {
                alert('Пользователь не найден!');
            }
            appData.render();
        },

        setInStorage: function() {
            localStorage.users = JSON.stringify(appData.users);
        }
    };

    document.getElementById('register').addEventListener('click', appData.regUser);
    document.getElementById('login').addEventListener('click', appData.loginUser);
    
    document.addEventListener('DOMContentLoaded', function() {
        if (localStorage.users !== undefined) {
            appData.users = JSON.parse(localStorage.users);
        }
        appData.render();
    });