import TaskList from "./components/TaskList";

const Home: React.FC = () => {
  return (
    <div className="flex jusitfy-center items-center flex-col gap-8">
      <h1 className="text-3xl font-semibold">Task Master</h1>
      <TaskList />
    </div>
  );
};

export default Home;
