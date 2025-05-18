import { SidebarTrigger } from '@/components/ui/sidebar';
import NewRegistrations from './components/NewRegistrations';
import TotalCourses from './components/TotalCourses';
import TotalStudents from './components/TotalStudents';

export default function DashboardPage() {
	return (
		<div className='flex flex-col min-h-screen'>
			<header className='border-b'>
				<div className='flex h-16 items-center px-4 gap-4'>
					<SidebarTrigger />
					<h1 className='text-xl font-semibold'>Dashboard</h1>
				</div>
			</header>
			<div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
					<TotalStudents />
					<NewRegistrations />
					<TotalCourses />
				</div>
			</div>
		</div>
	);
}
