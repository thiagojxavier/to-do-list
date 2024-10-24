const button = document.getElementById('submit');
const fieldInput = document.getElementById('enterTask');
const notification = document.getElementById('notification-alert');

const popup = document.getElementById('popup');
const okNotification = document.getElementById('ok-notification');
const closePopUpIcon = document.getElementById('close-popup');

const listTaskElement = document.getElementById('list');

let itemsList = [];

button.addEventListener('click', addTask );
fieldInput.addEventListener('keyup', event => {
    if (event.key == "Enter") { 
      addTask()
    }
});

popup.addEventListener('click', removeNotification );
fieldInput.focus();

const localStorageTaskListCondition = JSON.parse(localStorage.getItem('task-list')).length

if(localStorageTaskListCondition) {
    const list = JSON.parse(localStorage.getItem('task-list'));

    list.forEach((item) => {
        createLi(item.itemValue, item.id);
        itemsList.push(item);
    })
}

function addTask () {
    const value = fieldInput.value;
    const inputIsEmpty = checkIfFieldIsEmpty(value);

    if (inputIsEmpty) return

    itemsList.push({
        id: Math.floor(Math.random() * 9999999999),
        itemValue: value
    });

    localStorage.setItem('task-list', JSON.stringify([...itemsList]));

    const lastItem = itemsList[itemsList.length - 1];

    createLi(lastItem.itemValue, lastItem.id);

    const listTaskItem = document.querySelector('.content-main__section-list__task-add__list__task-item--animation');

    setTimeout( () => {
        listTaskItem.classList.remove('content-main__section-list__task-add__list__task-item--animation');
    }, 500);

    clearFieldAfterUse();
}

function createLi(value, id) {
    listTaskElement.innerHTML += 
        `<li class="content-main__section-list__task-add__list__task-item content-main__section-list__task-add__list__task-item--animation" id="item-${id}">
            <p class="content-main__section-list__task-add__list__task-item__paragraph">${value}</p>
            <i class="bi bi-trash3-fill content-main__section-list__task-add__list__task-item__trash-icon"></i>
        </li>`

    removeTask();
}

function checkIfFieldIsEmpty(value) {
    if( value === '' ) {
        showNotification();
        return true
    }

    return false
}

const showNotification = () => {
    notification.classList.remove('content-main__prompt-to-type-popup--disable');
    notification.classList.add('content-main__prompt-to-type-popup--active');
}

function removeNotification (event) {
    event.stopPropagation();
    
    popup.classList.add('content-main__prompt-to-type-popup__popup__close');

    setTimeout( () => {
        notification.classList.toggle('content-main__prompt-to-type-popup--disable', 'content-main__prompt-to-type-popup--active');

        popup.classList.remove('content-main__prompt-to-type-popup__popup__close');
    }, 200);
}

function removeTask() {
    const deleteTask = document.querySelectorAll('.content-main__section-list__task-add__list__task-item__trash-icon');

    deleteTask.forEach( item => {
        item.addEventListener('click', () => {
            const getItem = item.parentElement;

            getItem.classList.remove('content-main__section-list__task-add__list__task-item--animation');
            getItem.classList.add('content-main__section-list__task-add__list__task-item--removing-animation');

            const id = Number(getItem.id.split("-")[1]);

            const listAfterDeletingItem = itemsList.filter(li => li.id !== id);

            localStorage.setItem('task-list', JSON.stringify(listAfterDeletingItem));
            itemsList = listAfterDeletingItem;

            const getParentItem = getItem.parentElement;

            setTimeout( () => {
                getParentItem.removeChild(getItem);
            }, 500);
        });
    });
}

function clearFieldAfterUse() {
    fieldInput.value = '';
    fieldInput.focus();
}