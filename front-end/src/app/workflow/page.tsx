import Background from "./components/background";
import NavBar from "./components/nav-bar";
import Sidebar from "./components/side-bar";

const Workflow: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Background />
      </div>
    </div>
  );
};

export default Workflow;
