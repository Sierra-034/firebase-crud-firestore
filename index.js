import { saveTask, getTasks, onTasksChange, deleteTask, getTask, updateTask } from './firebase.js'

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {
    // const querySnapshot = await getTasks();
    onTasksChange((querySnapshot) => {
        let html = '';
        querySnapshot.forEach(doc => {
            const { title, description } = doc.data();
            html += `
                <div>
                    <h3>${ title }</h3>
                    <p>${ description }</p>
                    <button class='btn-delete' data-id='${doc.id}'>Delete</button>
                    <button class='btn-edit' data-id='${doc.id}'>Edit</button>
                </div>
            `;
        });
        
        taskContainer.innerHTML = html;
        const btnsDelete = taskContainer.querySelectorAll('.btn-delete');
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                deleteTask(dataset.id);
            });
        });

        const btnsEdit = taskContainer.querySelectorAll('.btn-edit');
        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async ({target: {dataset}}) => {
                const doc = await getTask(dataset.id);
                const {title, description} = doc.data();

                taskForm['task-title'].value = title;
                taskForm['task-description'].value = description;
                taskForm['btn-task-save'].innerText = 'Update';
                
                editStatus = true;
                id = doc.id;
            });
        })
    });

})

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = taskForm['task-title'];
    const description = taskForm['task-description'];

    if (editStatus) {
        updateTask(id, {title: title.value, description: description.value});
        taskForm['btn-task-save'].innerText = 'Save';
        editStatus = false;
    } else {
        saveTask(title.value, description.value);
    }
    
    taskForm.reset();
});
