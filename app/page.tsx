import TaskList from "./components/TaskList";

const Home: React.FC = () => {
  return (
    <div className="flex jusitfy-center items-center flex-col">
      <h1>Task Master</h1>
      <TaskList />
    </div>
  );
};

export default Home;
