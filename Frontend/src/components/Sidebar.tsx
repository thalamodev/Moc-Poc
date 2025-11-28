import Link from 'next/link';

export default function Sidebar() {
    return (
        <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-gray-50 border-r border-gray-200 pt-16">
            <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    <Link href="/" className="group flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-ptt-blue">
                        Dashboard
                    </Link>
                    <Link href="/moc/create" className="group flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-ptt-blue">
                        Create New MoC
                    </Link>
                    <Link href="/moc/approvals" className="group flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-ptt-blue">
                        Pending Approvals
                    </Link>
                    <div className="mt-8 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Reports
                    </div>
                    <Link href="/reports/summary" className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-ptt-blue">
                        Monthly Summary
                    </Link>
                </nav>
            </div>
        </div>
    );
}
