import { notFound } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { StudentProfile } from './components/StudentProfile';
import { getStudentById } from '@/lib/actions';

interface StudentProps {
	id: string;
	address: string;
	firstName: string;
	lastName: string;
	email: string;
	semester: string;
	middleName: string;
	matricNo: string;
	phone: string;
	dateOfBirth: Date;
	gender: string;
	city: string;
	state: string;
	program: string;
	createdAt: Date;
	courses: string[];
}

export default async function StudentPage({
	params,
}: {
	params: { id: string };
}) {
	const student: StudentProps | null = await getStudentById(params.id);

	if (!student) {
		notFound();
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<header className='border-b'>
				<div className='flex h-16 items-center px-4 gap-4'>
					<SidebarTrigger />
					<h1 className='text-xl font-semibold'>Student Profile</h1>
				</div>
			</header>
			<div className='flex-1 p-4 md:p-8'>
				<StudentProfile student={student} />
			</div>
		</div>
	);
}
