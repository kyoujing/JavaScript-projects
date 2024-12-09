const ampmbtn = document.getElementById('ampmbtn');
const ampmbtnimg = document.getElementById('ampmbtnImg');
const tdBtn = document.getElementById('tdbtn');
const inputField = document.getElementById('currtypingtext');
const dataTable = document.getElementById('dataTable');
const boxes = document.querySelectorAll('.box')
let toggled = false;
let currentFilter = "all";

const rowCountDisplay = document.getElementById('rowCount');

function updateRowCount() {
    const visibleRows = document.querySelectorAll('#todolist tr:not(.hidden)');
    const rowCount = visibleRows.length;
    if (rowCount === 0) {
        rowCountDisplay.textContent = '0 items left';
    } else if (rowCount === 1) {
        rowCountDisplay.textContent = '1 item left';
    } else {
        rowCountDisplay.textContent = `${rowCount} items left`;
    }
};

function filterRows(status) {
    const allRows = document.querySelectorAll("#todolist tr");
    allRows.forEach(row => {
        const rowStatus = row.getAttribute("data-status");
        if (status === "all") {
            row.classList.remove("hidden");
        } else if (status === rowStatus) {
            row.classList.remove("hidden");
        } else {
            row.classList.add("hidden");
        }
    });
    currentFilter = status;
    updateRowCount();
};

let DarkImg, LightImg, DarkPagesColor, LightPagesColor;
DarkPagesColor = 'rgb(90, 86, 86)';
LightPagesColor = 'rgb(252, 254, 254)';


function setBackgroundImage() {
    const isMobile = window.innerWidth <= 600;
    if (isMobile) {
        DarkImg = "url('images/bg-mobile-dark.jpg')";
        LightImg = "url('images/bg-mobile-light.jpg')";
    } else {
        DarkImg = "url('images/bg-desktop-dark.jpg')";
        LightImg = "url('images/bg-desktop-light.jpg')";
    }
    
    const pages = document.getElementById('pages')
    
    if (toggled) {
        document.body.style.backgroundImage = LightImg; 
        pages.style.backgroundColor = LightPagesColor;
    } else {
        document.body.style.backgroundImage = DarkImg; 
        pages.style.backgroundColor = DarkPagesColor;
    }
}

setBackgroundImage();
window.addEventListener('resize', setBackgroundImage); 

ampmbtn.addEventListener('click', () => {
    toggled = !toggled;
    const pages = document.getElementById('pages');

    if (!toggled) {
        document.body.style.backgroundImage = DarkImg;
        pages.style.backgroundColor = DarkPagesColor;
        pages.style.color = '';
        ampmbtnimg.src = "images/icon-sun.svg";
        document.body.style.backgroundColor = 'black';
        boxes.forEach(box => {
            box.style.backgroundColor = 'rgb(90, 86, 86)';
        });
    } else {
        document.body.style.backgroundImage = LightImg;
        pages.style.backgroundColor = LightPagesColor;
        pages.style.color = 'black';
        ampmbtnimg.src = "images/icon-moon.svg";
        document.body.style.backgroundColor = 'white';
        boxes.forEach(box => {
            box.style.backgroundColor = 'rgb(252, 254, 254)';
        });
    }
});

tdBtn.addEventListener('click', ()=> {
    const inputValue = inputField.value.trim();
    
    if(inputValue === '') {
        alert('Please enter some text');
        return;
    }

    const newTodo = document.createElement('tr');
    newTodo.setAttribute("data-status", "active");
    newTodo.setAttribute("draggable", "true");

    const actionCell = document.createElement('td');
    actionCell.style.display = 'flex';
    actionCell.style.alignItems = 'center';

    const button = document.createElement('button');
    button.className = 'circle-btn';

    const textSpan = document.createElement('span');
    textSpan.textContent = inputValue;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = '<img src="images/icon-cross.svg" alt="Delete" />';

    deleteButton.addEventListener('click', () => {
        dataTable.removeChild(newTodo);
        updateRowCount(); 
    });

    button.addEventListener('click', () => {
        if (newTodo.getAttribute("data-status") === "active") {
            newTodo.setAttribute("data-status", "completed");
            textSpan.style.color = 'gray';
            textSpan.style.textDecoration = 'line-through';
            
            const img = document.createElement('img');
            img.src = "images/icon-check.svg";
            img.classList.add('icon-check');
            button.replaceWith(img);
            filterRows(currentFilter); 

            img.addEventListener('click', () => {
                newTodo.setAttribute("data-status", "active");
                textSpan.style.color = '';
                textSpan.style.textDecoration = '';
                img.replaceWith(button);
                updateRowCount();
                filterRows(currentFilter); 
            });
        }
        updateRowCount();
    });

    actionCell.appendChild(button);
    actionCell.appendChild(textSpan);
    actionCell.appendChild(deleteButton);

    newTodo.appendChild(actionCell);
    
    newTodo.addEventListener('dragstart', (e) => {
        newTodo.classList.add('dragging'); 
        e.dataTransfer.setData('text/plain', null);
    });
    
        newTodo.addEventListener('dragend', () => {
        newTodo.classList.remove('dragging');
    });

    dataTable.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        const dragging = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(dataTable, e.clientY);
        if (afterElement == null) {
            dataTable.appendChild(dragging);
        } else {
            dataTable.insertBefore(dragging, afterElement);
        }
    });

    if (currentFilter === "active") {
        newTodo.classList.remove("hidden");
    } else if (currentFilter === "completed") {
        newTodo.classList.add("hidden");
    } else {
        newTodo.classList.remove("hidden");
    }

    dataTable.appendChild(newTodo);
    inputField.value = '';
    updateRowCount();
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('tr:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

const allBtn = document.getElementById('all');
const activeBtn = document.getElementById('active');
const completedBtn = document.getElementById('completed');

function resetActiveState() {
    allBtn.classList.remove('active');
    activeBtn.classList.remove('active');
    completedBtn.classList.remove('active');
};

allBtn.addEventListener('click', () => {
    resetActiveState();
    allBtn.classList.add('active');
    filterRows("all");
});

activeBtn.addEventListener('click', () => {
    resetActiveState();
    activeBtn.classList.add('active');
    filterRows("active");
});

completedBtn.addEventListener('click', () => {
    resetActiveState();
    completedBtn.classList.add('active');
    filterRows("completed");
});

const clearCompleted = document.getElementById("clearCompleted");
clearCompleted.addEventListener('click', ()=> {
    const completedTodo = document.querySelectorAll('tr[data-status= "completed"]');
    completedTodo.forEach(row => row.remove());
    updateRowCount();
});


window.onload = function(){
        updateRowCount();
        filterRows("all");
    };


