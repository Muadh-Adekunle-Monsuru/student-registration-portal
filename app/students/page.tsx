import { SidebarTrigger } from '@/components/ui/sidebar';
import { StudentsTable } from '@/components/students-table';
import StudentTableWrapper from './components/StudentTableWrapper';

export default function StudentsPage() {
	return (
		<div className='flex flex-col min-h-screen'>
			<header className='border-b'>
				<div className='flex h-16 items-center px-4 gap-4'>
					<SidebarTrigger />
					<h1 className='text-xl font-semibold'>Student Records</h1>
				</div>
			</header>
			<div className='flex-1 p-4 md:p-8'>
				<StudentTableWrapper />
			</div>
		</div>
	);
}

export const dynamic = 'force-dynamic';
