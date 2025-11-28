export default function Home() {
  return (
    <div className="space-y-8">
      {/* Top Section: Profile, Chart, Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Profile Card (Left) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#1e293b] text-white rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
            <div className="h-20 w-20 rounded-full border-4 border-gray-600 flex items-center justify-center mb-4">
              <svg className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Dr. Smith</h2>
            <p className="text-gray-400 text-sm">Surgeon</p>
            <div className="mt-4 bg-gray-700 rounded-lg px-3 py-1 text-sm font-bold">1</div>
          </div>

          <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wide">Division</p>
            <p className="font-bold text-gray-900 text-center">Emergency Department</p>
            <div className="mt-4 bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">3</div>
          </div>
        </div>

        {/* Chart (Center) */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-center relative">
          {/* Simple SVG Donut Chart */}
          <div className="relative h-64 w-64">
            <svg viewBox="0 0 36 36" className="h-full w-full transform -rotate-90">
              {/* Background Circle */}
              <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              {/* Progress Circle (Orange) */}
              <path className="text-orange-400" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-900">4</span>
              <span className="text-gray-500 text-sm">Plant Change</span>
            </div>
          </div>
        </div>

        {/* Status List (Right) */}
        <div className="lg:col-span-4 space-y-4">
          {/* In Progress */}
          <div className="bg-[#1e293b] text-white rounded-lg p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <svg className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="font-medium">In Progress</span>
            </div>
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">1</span>
          </div>

          {/* Awaiting Approval */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded-full border-2 border-green-500 flex items-center justify-center">
                <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">Awaiting Approval</span>
              </div>
            </div>
            <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">1</span>
          </div>

          {/* Expiring */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">Expiring/Overdue</span>
                <span className="text-xs text-gray-500">within 15 days</span>
              </div>
            </div>
            <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">0</span>
          </div>

          {/* No Movement */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">No Movement</span>
                <span className="text-xs text-gray-500">within 14 days</span>
              </div>
            </div>
            <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">1</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1e293b] rounded-lg p-6 flex items-center justify-between text-white shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-white text-[#1e293b] flex items-center justify-center">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Completed</h3>
              <p className="text-gray-400 text-sm">within 30 days</p>
            </div>
          </div>
          <div className="bg-gray-700 h-10 w-10 rounded flex items-center justify-center font-bold">1</div>
        </div>

        <div className="bg-[#1e293b] rounded-lg p-6 flex items-center justify-between text-white shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-white text-[#1e293b] flex items-center justify-center">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Rejected</h3>
              <p className="text-gray-400 text-sm">within 30 days</p>
            </div>
          </div>
          <div className="bg-gray-700 h-10 w-10 rounded flex items-center justify-center font-bold">1</div>
        </div>
      </div>

      {/* To do list */}
      <div className="space-y-4">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg font-bold">
          To do list
        </div>
        <div className="bg-[#1e293b] rounded-b-lg p-6 text-white shadow-lg">
          <div className="bg-white rounded-lg p-4 text-gray-900 flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">REQ-002</span>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">Implementation</span>
              </div>
              <h4 className="font-bold text-blue-900">Pump Replacement</h4>
              <p className="text-sm text-gray-500">Area: Unit 1</p>
              <p className="text-xs text-red-400 mt-1">2025-11-21 10:15</p>
            </div>
            <div className="text-right">
              <span className="text-blue-500 text-sm font-medium">* Approved to implement</span>
            </div>
          </div>
        </div>
      </div>

      {/* My In Progress MoC */}
      <div className="space-y-4">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg font-bold">
          My In Progress MoC
        </div>
        <div className="bg-white border border-gray-200 rounded-b-lg overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MoC No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MoC Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initiator</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Required</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">REQ-001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">Emergency Valve Repair</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Plant Change</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Permanent</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <div className="h-3 w-3 rounded-sm bg-green-500"></div>
                    <div className="h-3 w-3 rounded-sm bg-green-500"></div>
                    <div className="h-3 w-3 rounded-sm bg-red-500"></div>
                    <div className="h-3 w-3 rounded-sm bg-gray-300"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>Work Permit</div>
                  <div className="text-xs text-gray-500">Document or Link Path</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2025-11-21<br />14:30
                </td>
              </tr>
            </tbody>
          </table>
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Previous</a>
              <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Next</a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">1</span> of <span className="font-medium">1</span> items
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
