// City SQL Queries
export const cityQueries = {
  getAll: `
SELECT 
  *
FROM tasks order by id desc ;

`,
  getById: "SELECT * FROM city WHERE city_id = $1",
  create:
    "INSERT INTO tasks (name, completed, task_date) VALUES ($1, $2, $3) RETURNING *",
  delete: "DELETE FROM tasks WHERE id = $1",
  exists: "SELECT * FROM tasks WHERE id = $1",
};

// Made with Bob
