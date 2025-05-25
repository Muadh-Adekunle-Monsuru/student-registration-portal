import { SidebarTrigger } from '@/components/ui/sidebar';
import { EditStudentRegistrationForm } from '../components/EditStudentRegistrationForm';
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

export default async function EditPage({ params }: { params: { id: string } }) {
	const student: StudentProps | null = await getStudentById(params.id);
	return (
		<div className='flex flex-col min-h-screen'>
			<header className='border-b'>
				<div className='flex h-16 items-center px-4 gap-4'>
					<SidebarTrigger />
					<h1 className='text-xl font-semibold'>Edit Student Information</h1>
				</div>
			</header>
			<div className='flex-1 p-4 md:p-8'>
				<EditStudentRegistrationForm student={student} />
			</div>
		</div>
	);
}
