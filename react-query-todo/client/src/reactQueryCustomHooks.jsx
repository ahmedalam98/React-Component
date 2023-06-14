import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customURL from "./utils";

export const useFetchTasks = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customURL.get("/"),

    // ---> to see the error message
    // queryFn: () => customURL.get("/AHMED"),
  });
  // console.log(data);

  return { isLoading, data, isError, error };
};

///////////////////////////////////////////////////////////////

export const useCreateTask = (updateNewItemName) => {
  const queryClient = useQueryClient();

  const { mutate: addTask, isLoading } = useMutation({
    mutationFn: (newItemName) => customURL.post("/", { title: newItemName }),
    onSuccess: () => {
      // the next line is to refetch the data from the server after adding a new item instead of doing manual refresh
      queryClient.invalidateQueries({ queryKey: "tasks" });
    },

    onError: () => {
      console.log(error.message);
    },
  });

  const handleAddTask = (newItemName) => {
    addTask(newItemName);
    updateNewItemName("");
  };

  return { handleAddTask, isLoading };
};

///////////////////////////////////////////////////////////////

export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ id, isDone }) => customURL.patch(`/${id}`, { isDone }),
    onSuccess: () => {
      // Next line ---> is to refetch the data from the server after adding a new item [ instead of doing manual refresh ]
      // BTW it's so hard to do with useEffect
      queryClient.invalidateQueries({ queryKey: "tasks" });
    },
    onError: (error) => {
      console.log(error.response.data.msg);
    },
  });
  return { editTask };
};

///////////////////////////////////////////////////////////////

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask } = useMutation({
    mutationFn: (id) => customURL.delete(`/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "tasks" });
    },
    onError: (error) => {
      console.log(error.response.data.msg);
    },
  });
  return { deleteTask };
};
