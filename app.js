const button = document.getElementById('submit');
const fieldInput = document.getElementById('enterTask');
const notification = document.getElementById('notification-alert');

const popup = document.querySelector('.popup');
const okNotification = document.getElementById('ok-notification');
const closePopUpIcon = document.getElementById('close-popup');

const listTask = document.getElementById('list');

button.addEventListener('click', addTask );
fieldInput.addEventListener('keyup', event => {
    var key = event.which || event.keyCode;
    if (key == 13) { 
      addTask()
    }
});

popup.addEventListener('click', removeNotification );


function addTask () {
    const value = fieldInput.value;
    const inputIsEmpty = checkIfFieldIsEmpty(value);

    if (inputIsEmpty) return

    listTask.innerHTML += `<li class="task-item animation">
                            <p>${value}</p>
                            <i class="bi bi-trash3-fill trash"></i>
                        </li>`

    const listTaskItem = document.querySelector('.animation');

    setTimeout( () => {
        listTaskItem.classList.remove('animation');
    }, 500);

    removeTask();

    clearFieldAfterUse();
}

const checkIfFieldIsEmpty = value => {
    if( value === '' ) {
        showNotification();
        return true
    }

    return false
}

const showNotification = () => {
    notification.classList.remove('prompt-to-type-popup-disable');
    notification.classList.add('prompt-to-type-popup-active');
}

function removeNotification (event) {
    event.stopPropagation();
    
    popup.classList.add('close');

    setTimeout( () => {
        notification.classList.toggle('prompt-to-type-popup-disable', 'prompt-to-type-popup-active');

        popup.classList.remove('close');
    }, 200);
}

function removeTask() {
    const deleteTask = document.querySelectorAll('.trash');

    deleteTask.forEach( item => {
        item.addEventListener('click', () => {
            const getItem = item.parentElement;

            getItem.classList.remove('animation');
            getItem.classList.add('removing-animation');

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