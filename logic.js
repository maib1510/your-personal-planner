// Application state
let tasks = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
};

let currentDay = '';
let currentView = 'week';
let selectedDayIndex = 0;
const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
};

// Load tasks from localStorage on init
window.addEventListener('DOMContentLoaded', () => {
    loadTasksFromStorage();
    renderAllTasks();
    updateStats();
});

// Function to show add task modal
function showAddTaskModal(day) {
    currentDay = day;
    document.getElementById('taskModal').style.display = 'block';
    document.getElementById('taskTitle').focus();
}

// Function to close modal
function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
    document.getElementById('taskForm').reset();
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('taskModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Handle form submission
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value.trim();
    const time = document.getElementById('taskTime').value;
    const priority = document.getElementById('taskPriority').value;

    if (title) {
        addTask(currentDay, title, time, priority);
        closeModal();
    }
});

// Function to add a task
function addTask(day, title, time, priority) {
    const task = {
        id: Date.now(),
        title,
        time,
        priority,
        completed: false
    };

    tasks[day].push(task);
    saveTasksToStorage();
    renderCurrentView();
    updateStats();
}

// Function to delete a task
function deleteTask(day, taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks[day] = tasks[day].filter(task => task.id !== taskId);
        saveTasksToStorage();
        renderCurrentView();
        updateStats();
    }
}

// Function to mark a task as completed
function toggleTaskComplete(day, taskId) {
    const task = tasks[day].find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderCurrentView();
        updateStats();
    }
}

// Function to render tasks for a day
function renderDayTasks(day) {
    const taskList = document.getElementById(`${day}-tasks`);
    if (!taskList) return;

    taskList.innerHTML = '';

    if (tasks[day].length === 0) {
        taskList.innerHTML = '<li class="empty-day">No scheduled tasks</li>';
        return;
    }

    // Sort tasks by time
    const sortedTasks = [...tasks[day]].sort((a, b) => {
        if (!a.time) return 1;
        if (!b.time) return -1;
        return a.time.localeCompare(b.time);
    });

    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item priority-${task.priority}${task.completed ? ' completed' : ''}`;

        li.innerHTML = `
            <div class="task-content">
                <input
                    type="checkbox"
                    class="task-checkbox"
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTaskComplete('${day}', ${task.id})"
                >
                <div class="task-details">
                    <div class="task-title">${task.title}</div>
                    ${task.time ? `<div class="task-time"><i class="fas fa-clock"></i> ${task.time}</div>` : ''}
                </div>
                <div class="task-actions">
                    <button class="delete-btn" onclick="deleteTask('${day}', ${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Function to render all tasks
function renderAllTasks() {
    Object.keys(tasks).forEach(day => {
        renderDayTasks(day);
    });
}

// Change view
function changeView(view) {
    currentView = view;

    // Update active buttons
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Show/hide views
    document.getElementById('weekView').style.display = view === 'week' ? 'grid' : 'none';
    document.getElementById('dayView').style.display = view === 'day' ? 'block' : 'none';
    document.getElementById('listView').style.display = view === 'list' ? 'block' : 'none';
    document.getElementById('dayNavigator').style.display = view === 'day' ? 'flex' : 'none';

    renderCurrentView();
}

// Render current view
function renderCurrentView() {
    if (currentView === 'week') {
        renderAllTasks();
    } else if (currentView === 'day') {
        renderDayView();
    } else if (currentView === 'list') {
        renderListView();
    }
}

// Render day view
function renderDayView() {
    const day = daysOfWeek[selectedDayIndex];
    document.getElementById('currentDayTitle').textContent = dayNames[day];

    const content = document.getElementById('dayViewContent');
    content.innerHTML = `
        <div class="day-header">
            <div class="day-title">
                <i class="fas fa-circle day-indicator"></i>
                <h2>${dayNames[day]}</h2>
            </div>
            <button class="add-task-btn" onclick="showAddTaskModal('${day}')">
                <i class="fas fa-plus"></i>
            </button>
        </div>
        <ul class="task-list" id="day-view-tasks"></ul>
    `;

    renderDayTasksInContainer(day, 'day-view-tasks');
}

// Render list view
function renderListView() {
    const content = document.getElementById('listViewContent');
    content.innerHTML = '';

    daysOfWeek.forEach(day => {
        const dayTasks = tasks[day];
        const section = document.createElement('div');
        section.className = 'list-day-section';

        const taskCount = dayTasks.length;
        const completedCount = dayTasks.filter(t => t.completed).length;

        section.innerHTML = `
            <div class="list-day-header">
                <h3>${dayNames[day]}</h3>
                <div>
                    ${taskCount > 0 ? `<span class="task-count">${completedCount}/${taskCount} completed</span>` : ''}
                    <button class="add-task-btn" onclick="showAddTaskModal('${day}')" style="margin-left: 10px;">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <ul class="task-list" id="list-${day}-tasks"></ul>
        `;

        content.appendChild(section);
        renderDayTasksInContainer(day, `list-${day}-tasks`);
    });
}

// Render tasks for a day in a specific container
function renderDayTasksInContainer(day, containerId) {
    const taskList = document.getElementById(containerId);
    if (!taskList) return;

    taskList.innerHTML = '';

    if (tasks[day].length === 0) {
        taskList.innerHTML = '<li class="empty-day">No scheduled tasks</li>';
        return;
    }

    // Sort tasks by time
    const sortedTasks = [...tasks[day]].sort((a, b) => {
        if (!a.time) return 1;
        if (!b.time) return -1;
        return a.time.localeCompare(b.time);
    });

    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item priority-${task.priority}${task.completed ? ' completed' : ''}`;

        li.innerHTML = `
            <div class="task-content">
                <input
                    type="checkbox"
                    class="task-checkbox"
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTaskComplete('${day}', ${task.id})"
                >
                <div class="task-details">
                    <div class="task-title">${task.title}</div>
                    ${task.time ? `<div class="task-time"><i class="fas fa-clock"></i> ${task.time}</div>` : ''}
                </div>
                <div class="task-actions">
                    <button class="delete-btn" onclick="deleteTask('${day}', ${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Update header statistics
function updateStats() {
    let totalTasks = 0;
    let completedTasks = 0;

    Object.values(tasks).forEach(dayTasks => {
        totalTasks += dayTasks.length;
        completedTasks += dayTasks.filter(t => t.completed).length;
    });

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
}

// Navigate to previous day
function previousDay() {
    selectedDayIndex = (selectedDayIndex - 1 + 7) % 7;
    renderDayView();
}

// Navigate to next day
function nextDay() {
    selectedDayIndex = (selectedDayIndex + 1) % 7;
    renderDayView();
}

// Function to clear all tasks
function clearAllTasks() {
    if (confirm('Are you sure you want to delete all tasks for the week?')) {
        tasks = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        };
        saveTasksToStorage();
        renderCurrentView();
        updateStats();
    }
}

// Save tasks to localStorage
function saveTasksToStorage() {
    localStorage.setItem('weeklyPlannerTasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasksFromStorage() {
    const stored = localStorage.getItem('weeklyPlannerTasks');
    if (stored) {
        try {
            const loadedTasks = JSON.parse(stored);

            // Migrate old Spanish keys to English
            const dayMapping = {
                'lunes': 'monday',
                'martes': 'tuesday',
                'miercoles': 'wednesday',
                'jueves': 'thursday',
                'viernes': 'friday',
                'sabado': 'saturday',
                'domingo': 'sunday'
            };

            // Check if we need to migrate
            const needsMigration = Object.keys(loadedTasks).some(key => dayMapping[key]);

            if (needsMigration) {
                // Migrate from Spanish to English
                Object.keys(dayMapping).forEach(spanishDay => {
                    const englishDay = dayMapping[spanishDay];
                    if (loadedTasks[spanishDay]) {
                        tasks[englishDay] = loadedTasks[spanishDay];
                    }
                });
                // Save migrated data
                saveTasksToStorage();
            } else {
                // Data is already in English format
                tasks = loadedTasks;
            }
        } catch (e) {
            console.error('Error loading tasks:', e);
        }
    }
}

// Export data to JSON file
function exportData() {
    const dataToExport = {
        tasks: tasks,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };

    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `weekly-planner-backup-${new Date().toISOString().split('T')[0]}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('Your data has been exported successfully!');
}

// Import data from JSON file
function importData() {
    document.getElementById('fileInput').click();
}

// Handle file import
function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedData = JSON.parse(e.target.result);

            if (importedData.tasks) {
                if (confirm('This will replace your current data. Are you sure you want to continue?')) {
                    tasks = importedData.tasks;
                    saveTasksToStorage();
                    renderCurrentView();
                    updateStats();
                    alert('Data imported successfully!');
                }
            } else {
                alert('Invalid file format. Please select a valid backup file.');
            }
        } catch (error) {
            console.error('Error importing data:', error);
            alert('Error importing file. Please make sure it is a valid backup file.');
        }

        // Reset file input
        event.target.value = '';
    };

    reader.readAsText(file);
}
