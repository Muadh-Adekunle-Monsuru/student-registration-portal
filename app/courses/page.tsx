import { SidebarTrigger } from '@/components/ui/sidebar';
import CourseListDashboard from './components/CourseListDashboard';
import { CourseRegistrationForm } from './components/CourseRegistrationForm';

export default function CoursesPage() {
	return (
		<div className='flex flex-col min-h-screen'>
			<header className='border-b'>
				<div className='flex h-16 items-center px-4 gap-4'>
					<SidebarTrigger />
					<h1 className='text-xl font-semibold'>Course Registration</h1>
				</div>
			</header>
			<div className='flex-1 p-4 md:p-8'>
				<CourseRegistrationForm />
				<CourseListDashboard />
			</div>
		</div>
	);
}
