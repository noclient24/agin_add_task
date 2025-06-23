"use client";
import { UserContext } from "@/app/context/usecontext";
import { deleteTask, getTasksByUser } from "@/app/services/Add_user";
import { useContext, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const context = useContext(UserContext);

  const fetchTasks = async (userId) => {
    try {
      setLoading(true);
      const response = await getTasksByUser(userId);
      setTasks(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this task?")) return;
      
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const toggleExpand = (taskId) => {
    setExpandedTaskId((prev) => (prev === taskId ? null : taskId));
  };

  useEffect(() => {
    if (context.user?._id) {
      fetchTasks(context.user._id);
    } else {
      setLoading(false);
    }
  }, [context.user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Your Tasks
        </h1>
        
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {context.user ? "No tasks available. Create your first task!" : "Please log in to view your tasks"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${
                  task.status === "completed"
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-red-50 border-l-4 border-red-500"
                }`}
              >
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                        {task.title}
                      </h2>
                      {expandedTaskId === task._id && (
                        <div className="mt-3">
                          <p className="text-gray-600">{task.content}</p>
                          <div className="flex flex-wrap justify-between mt-4 text-sm">
                            <span className={`px-2 py-1 rounded-full ${
                              task.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {task.status}
                            </span>
                            <span className="text-gray-500">
                              {new Date(task.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => toggleExpand(task._id)}
                        className="px-3 py-1 text-xs md:text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        {expandedTaskId === task._id ? "Collapse" : "Details"}
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-1 md:p-2 text-red-600 hover:bg-red-100 rounded-full"
                        title="Delete task"
                      >
                        <RxCross1 className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowTasks;