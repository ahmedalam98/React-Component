import SingleTask from "./SingleItem";
import { useFetchTasks } from "./reactQueryCustomHooks";

const Items = () => {
  const { isLoading, data, isError, error } = useFetchTasks();

  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading...</p>;
  }

  //////////////////////////////////////////////////
  if (isError) {
    console.log(error);
    return <p style={{ marginTop: "1rem" }}>There was an error ...</p>;
  }

  // OR
  // Note ---> error is an object comes from axios, in case of using fetch function we will another object

  // if (error) {
  //   console.log(error);
  //   return <p style={{ marginTop: "1rem" }}>{error.message}</p>;
  // }
  /////////////////////////////////////////////////////

  return (
    <div className="items">
      {data.data.taskList.map((item) => {
        return <SingleTask key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
