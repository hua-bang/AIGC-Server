import { ArrowUpRight } from "lucide-react";

const EndNodeContent = () => {
  return (
    <div className="w-72 bg-white rounded-lg shadow-md border border-gray-200 text-sm">
      <div className="flex items-center p-3 border-b border-gray-200">
        <div className="bg-blue-600 text-white p-1 rounded mr-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="font-semibold">结束</h2>
      </div>

      <div className="p-3">
        <p className="text-xs text-gray-600 mb-2">
          The final node of the workflow, used to return the result information
          after the workflow runs.
        </p>

        <div className="mb-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium flex items-center">
              Output
              <span className="ml-1 text-gray-400">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 16V12M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
            <ArrowUpRight className="text-gray-400" size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndNodeContent;
