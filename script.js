let taskList = document.querySelector('.task-list')
let form = document.querySelector('.add-form')
let taskDescription = document.querySelector('.task-description')
let taskPriority = document.querySelector('.task-priority')
let taskAssign = document.querySelector('.task-assign')
let taskForm = document.querySelector('.task-form')
form.addEventListener('submit',(e) => saveTasks(e))


function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []
}

function saveTasks(event) {
    event.preventDefault()
    let tasks = getTasks()
    let newTask = {
        id: +new Date(),
        description: taskDescription.value,
        isOpen: true,
        assignPerson: taskAssign.value,
        status: taskPriority.value
    }
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
    taskForm.reset()
    view()
}

function view() {
    // let tasks = [{
    //     id: 'ytre-43453-ytre-5433-gddsfv',
    //     description: 'Zakonchit verstku proyekta',
    //     isOpen: 'Открыта',
    //     assignPerson:'Ivanov Ivan',
    //     status: 'Срочно'
    // }]
    taskList.innerHTML = ''
    let tasks = getTasks()
    tasks.forEach(task => {
        taskList.innerHTML += `<div class="bg-light p-3 mb-3">
                    <h6>Номер задачи: ${task.id}</h6>
                    <span class="badge ${task.isOpen ? 'bg-primary' : 'bg-secondary'} ">${task.isOpen ? 'Open' : 'Closed'}</span>
                    <h3 class="my-4">${task.description}</h3>
                    <div class="status">
                        <i class="fas fa-clock"></i>
                        <span class="text-danger">${task.status}</span>
                    </div>
                    <div class="assign mb-3">
                        <i class="far fa-user-circle"></i>
                        <span>${task.assignPerson}</span>
                    </div>
                    <button type="button" class="close btn ${task.isOpen ? 'btn-success' : 'btn-warning'}">${task.isOpen ? 'Close':'Open'}</button>
                    <button type="button" class="btn btn-danger del-btn">Удалить</button>
                </div>`

    })
    document.querySelectorAll('.del-btn').forEach((deleteBtn, indexBtn) => {
        deleteBtn.addEventListener('click', () => {
            let tasks = getTasks().filter((el, idx) => indexBtn !== idx)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            view()
        })
    })
    document.querySelectorAll('.close').forEach((activeBtn, idxBtn) => {
       let tasks = getTasks()
        activeBtn.addEventListener('click', () => {
            tasks = tasks.map((task, taskIndex) => {
                console.log(task.isOpen)
                if(taskIndex === idxBtn) {
                    return {...task, isOpen: !task.isOpen}
                }
                       return task
                })
                    localStorage.setItem('tasks', JSON.stringify(tasks))
                    view()
        })
    })
}
view()





