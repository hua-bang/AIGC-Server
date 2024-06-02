const NavBar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">Tech_Weekly</span>
        <span className="text-green-600">● Published</span>
        <span className="text-sm text-gray-500">Auto-saved 23:43:24</span>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Test Run
        </button>
        <button className="px-4 py-2 bg-blue-700 text-white rounded">
          Publish
        </button>
      </div>
    </div>
  );
};

export default NavBar;
