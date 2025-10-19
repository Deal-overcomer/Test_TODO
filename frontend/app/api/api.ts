import { API_URL } from "@constants/apiConst";
import { TaskProp } from "@types-project/mainTypes";

export const getTasks = async (): Promise<{
  success: boolean;
  data: TaskProp[] | null;
}> => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    const result: { success: boolean; data: TaskProp[] } =
      await response.json();
    for (let task of result.data) {
      task.createdAt = new Date(task.createdAt);
    }

    return result;
  } catch (error: any) {
    console.error("Error fetching tasks: ", error);
    return { success: false, data: null };
  }
};

export const createTask = async (
  title: string,
  description: string
): Promise<{
  success: boolean;
  data: TaskProp | null;
}> => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    return response.json();
  } catch (error: any) {
    console.error("Error creating task: ", error);
    return { success: false, data: null };
  }
};

export const updateTask = async (
  id: string,
  title: string,
  description: string
): Promise<{
  success: boolean;
  data: TaskProp | null;
}> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    return response.json();
  } catch (error: any) {
    console.error("Error updating task: ", error);
    return { success: false, data: null };
  }
};

export const deleteTask = async (
  id: string
): Promise<{
  success: boolean;
  data: null;
}> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    return response.json();
  } catch (error: any) {
    console.error("Error deleting task: ", error);
    return { success: false, data: null };
  }
};
