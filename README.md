# 📅 Weekly Planner Pro

A modern, user-friendly personal weekly planner to help you organize your week and boost your productivity!  Built with pure HTML, CSS, and JavaScript - no frameworks required. 

![CSS](https://img.shields.io/badge/CSS-239120?style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 📊 Multiple Views
- **Week View**: See all 7 days at a glance in a beautiful card layout
- **Day View**: Focus on a single day with navigation controls
- **List View**: Comprehensive overview with task completion statistics for each day

### ✅ Task Management
- **Add Tasks**: Create tasks with title, time, and priority levels (Low 🟢, Medium 🟡, High 🔴)
- **Complete Tasks**: Mark tasks as done with a simple checkbox
- **Delete Tasks**: Remove tasks with confirmation prompts
- **Priority System**: Visual indicators for task importance
- **Time Sorting**: Tasks automatically sorted by scheduled time

### 💾 Data Persistence
- **Local Storage**: All your data is saved automatically in your browser
- **Export Data**: Download your tasks as a JSON backup file
- **Import Data**:  Restore your tasks from a backup file
- **Data Migration**: Automatic migration from older versions

### 📈 Statistics Dashboard
- Real-time task counter
- Completion progress tracking
- Visual stats in the header

### 🎨 Modern UI/UX
- Gradient backgrounds with glassmorphism effects
- Smooth animations and transitions
- Responsive design for all devices
- Font Awesome icons
- Google Fonts (Inter typography)

## 🚀 Getting Started

### Prerequisites
No installation required! Just a modern web browser.

### Usage

1. **Clone the repository**
```bash
git clone https://github.com/maib1510/your-personal-planner.git
cd your-personal-planner
```

2. **Open the application**
Simply open `index.html` in your favorite web browser.

3. **Start planning!**
   - Click the **+** button on any day to add a task
   - Fill in the task details (title, time, priority)
   - Mark tasks as completed by checking the checkbox
   - Switch between views using the view selector buttons
   - Export your data regularly for backup

## 📁 Project Structure

```
your-personal-planner/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling and animations
├── logic.js        # Application logic and functionality
└── README.md       # This file
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5**:  Semantic markup
- **CSS3**: Custom properties, gradients, flexbox, grid, animations
- **JavaScript (ES6+)**: Modern vanilla JS with localStorage API

### Key Functions
- `addTask()` - Create new tasks
- `deleteTask()` - Remove tasks
- `toggleTaskComplete()` - Mark tasks as done/undone
- `exportData()` - Download backup JSON file
- `importData()` - Restore from backup
- `changeView()` - Switch between Week/Day/List views

### Browser Compatibility
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## 📝 How It Works

1. **Data Structure**: Tasks are organized in an object with keys for each day of the week
2. **LocalStorage**: Tasks persist between sessions using `localStorage`
3. **Dynamic Rendering**: Views are generated dynamically based on the current state
4. **Event Handling**: Modal forms and interactive elements for seamless UX

## 🎯 Use Cases

- Personal weekly planning
- Work task organization
- Study schedule management
- Habit tracking
- Project timeline planning

## 🔒 Privacy

All your data is stored **locally in your browser**. No server, no tracking, no data collection.  Your tasks never leave your device unless you choose to export them.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  Feel free to check the [issues page](https://github.com/maib1510/your-personal-planner/issues).

## 📄 License

This project is open source and available for free use. 

## 🌟 Features Coming Soon

- Edit existing tasks
- Recurring tasks
- Categories/tags
- Dark mode
- Calendar integration
- Mobile app version

## 👨‍💻 Author

**maib1510**
- GitHub: [@maib1510](https://github.com/maib1510)

---

⭐ If you find this project useful, please consider giving it a star!
