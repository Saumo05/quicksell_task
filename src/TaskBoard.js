import React from "react";
import TaskColumn from "./TaskColumn";
import "./TaskBoard.css";

const groupTasks = (tasks, groupBy) => {
  console.log(tasks);

  return tasks.reduce((groups, task) => {
    let groupKey;

    // Group by userId if groupBy is set to 'user'
    if (groupBy === "users") {
      groupKey = task.userId; // Group by user ID
      console.log(task.userId);
    } else if (groupBy === "priority") {
      groupKey = task.priority;
    } else if (groupBy === "status") {
      groupKey = task.status;
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(task);
    return groups;
  }, {});
};

const getGroupLabel = (groupBy, group, users) => {
  if (groupBy === "priority") {
    switch (parseInt(group)) {
      case 4:
        return "Urgent";
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      case 0:
        return "No Priority";
      default:
        return "Unknown";
    }
  } else if (groupBy === "users") {
    const user = users.find((user) => user.id === group);
    console.log(user.name);
    return user ? user.name : "Unknown User"; // Return user name based on userId
  }
  return group; // Return group for other types (like status)
};

function TaskBoard({ tasks, groupBy, users }) {
  const groupedTasks = groupTasks(tasks, groupBy);

  return (
    <div className="task-board">
      {Object.keys(groupedTasks).map((group) => (
        <TaskColumn
          groupBy={groupBy}
          key={group}
          group={getGroupLabel(groupBy, group, users)} // Get group label
          tasks={groupedTasks[group]} // Pass tasks for this group
          users={users}
        />
      ))}
    </div>
  );
}

export default TaskBoard;
