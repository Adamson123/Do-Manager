import { SubtaskInitialStateTypes } from "@/features/subtaskSlice";

const generateSpell = (existingData: SubtaskInitialStateTypes) => {
  const existingDataLength = existingData.subtasks.length;
  const lastDueDate = existingDataLength
    ? existingData.subtasks[existingDataLength - 1].dueDate
    : new Date().toISOString();

  const spell = `
You are a cutting-edge AI designed to break down tasks into manageable subtasks. Here's what you need to do:
---
### Instructions:
1. **Divide the task** into **logical, actionable subtasks** that are simple, clear, and easy to execute. 📝
2. **Sequence the subtasks** so that one step logically leads to the next. Ensure that dependencies are considered, and subtasks flow in a natural order to achieve the overall task goal.
3. **Align due dates realistically:**
   - Ensure no due date is earlier than today’s date ${new Date().toISOString()} or ${lastDueDate} only if it is not less than ${new Date().toISOString()}.
   - The due date of each subtask must align with the timeline of the overall task.
   - Ensure no two subtasks that depend on each other have overlapping or out-of-sequence due dates.
   - And dueDate of each task need to be far apart only base on how long you think it will take the earlier subtask to
   be completed 
4. **Avoid duplicates:** 
   - Compare the newly generated subtasks with the existing ones provided in the Other Subtasks field.
   - Ensure no new subtask repeats a title, description, or due date from the existing subtasks.
5. **Complement existing subtasks** by addressing any gaps in the overall plan while ensuring no redundancy.
6. **Avoid ambiguity or irrelevant information.** Keep the subtasks straightforward and focused.
7. **Follow the structure of the provided schema strictly.** 🛠️
8. **Use emojis sparingly** and only when they add necessary context or improve clarity.
---

### Provided Context:
- **Task Title:** ${existingData.taskTitle}
- **Task Description:** ${existingData.taskDescription}
- **Task Priority:** ${existingData.taskPriority}
- **Other Subtasks:** ${JSON.stringify(existingData.subtasks)}

---

### Schema for Each Subtask:

{
  "title": "String (up to 255 characters)",
  "description": "String (detailed task description)",
  "dueDate": "DateTime (ISO 8601 format, must be today or later if unspecified)"
}

Return only a JSON array of subtasks. Example:

[
  {
    "title": "Research Project Requirements",
    "description": "Gather all necessary details about the project goals, constraints, and resources.",
    "dueDate": "2024-11-24T00:00:00Z"
  },
  {
    "title": "Identify Key Stakeholders",
    "description": "Determine the individuals or teams involved and their roles in the project.",
    "dueDate": "2024-11-25T00:00:00Z"
  },
  {
    "title": "Create Initial Draft Plan",
    "description": "Develop a rough plan including key steps, milestones, and deadlines for the project.",
    "dueDate": "2024-11-26T00:00:00Z"
  }
]
  
  `;
  return spell;
};

export default generateSpell;
