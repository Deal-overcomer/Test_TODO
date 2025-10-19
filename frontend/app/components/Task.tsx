import React, { useCallback, useState, useRef, useEffect } from "react";
import { deleteTask, updateTask } from "@api/api";
import { TaskProps } from "@types-project/mainTypes";

const Task = React.memo(
  ({ id, title, description, createdAt, setTasks, editTaskId }: TaskProps) => {
    const [isEditing, setIsEditing] = useState(editTaskId === id);
    const [titleState, setTitle] = useState(title);
    const [descriptionState, setDescription] = useState(description);
    const [editingField, setEditingField] = useState<"title" | "description">(
      "title"
    );
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const originalTitleRef = useRef(title);
    const originalDescriptionRef = useRef(description);

    useEffect(() => {
      if (isEditing && editingField === "title" && titleInputRef.current) {
        titleInputRef.current.focus();
        titleInputRef.current.select();
      } else if (
        isEditing &&
        editingField === "description" &&
        descriptionInputRef.current
      ) {
        descriptionInputRef.current.focus();
        descriptionInputRef.current.select();
      }
    }, [isEditing, editingField]);

    const removeTask = useCallback(async () => {
      const response = await deleteTask(id);
      if (response.success) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      }
    }, [setTasks]);

    const handleEdit = useCallback(() => {
      originalTitleRef.current = titleState;
      originalDescriptionRef.current = descriptionState;
      setIsEditing(true);
      setEditingField("title");
    }, [titleState, descriptionState]);

    const handleUnfocus = useCallback(async () => {
      await updateTask(id, titleState, descriptionState);
      setIsEditing(false);
    }, [id, titleState, descriptionState]);

    const handleDescriptionClick = useCallback(() => {
      setIsEditing(true);
      setEditingField("description");
    }, []);

    const handleTitleKeyDown = useCallback(
      async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          await updateTask(id, titleState, descriptionState);
          setEditingField("description");
        } else if (event.key === "Escape") {
          setTitle(originalTitleRef.current);
          setDescription(originalDescriptionRef.current);
          setIsEditing(false);
        }
      },
      [id, titleState, descriptionState]
    );

    const handleDescriptionKeyDown = useCallback(
      async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          await updateTask(id, titleState, descriptionState);
          setIsEditing(false);
        } else if (event.key === "Escape") {
          setTitle(originalTitleRef.current);
          setDescription(originalDescriptionRef.current);
          setIsEditing(false);
        }
      },
      [id, titleState, descriptionState]
    );

    return (
      <article className="task">
        <>
          {isEditing && editingField === "title" ? (
            <>
              <input
                ref={titleInputRef}
                type="text"
                className="title-input"
                value={titleState}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleTitleKeyDown}
                onBlur={handleUnfocus}
              />
              <p className="description">{descriptionState}</p>
            </>
          ) : isEditing && editingField === "description" ? (
            <>
              <p className="title">{titleState}</p>
              <input
                ref={descriptionInputRef}
                type="text"
                className="description-input"
                value={descriptionState}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleDescriptionKeyDown}
                onBlur={handleUnfocus}
              />
            </>
          ) : (
            <>
              <p onClick={handleEdit} className="title">
                {titleState}
              </p>
              <p onClick={handleDescriptionClick} className="description">
                {descriptionState}
              </p>
            </>
          )}
        </>

        <div className="buttons">
          <button className="button button-edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="button button-complete" onClick={removeTask}>
            Complete
          </button>
        </div>
        <p className="created">
          Created: {createdAt.getDate()}.{createdAt.getMonth() + 1}.
          {createdAt.getFullYear()} at {createdAt.getHours()}:
          {createdAt.getMinutes().toString().padStart(2, "0")}
        </p>
      </article>
    );
  }
);

export default Task;
