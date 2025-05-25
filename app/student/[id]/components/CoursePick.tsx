import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/client';
import { Courses, Student } from '@prisma/client';
import EnrollButton from './EnrollButton';

export default function CoursePick({
	student,
	courses,
}: {
	student: Student;
	courses: Courses[];
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Student Course Form</CardTitle>
			</CardHeader>
			<CardContent>
				{courses.map((course) => (
					<div
						className='grid grid-cols-5 items-center gap-1 p-1'
						key={course.id}
					>
						<h3 className=' col-span-2'>{course.title}</h3>
						<p className='text-sm text-muted-foreground'>{course.code}</p>
						<p>
							{student.courses.includes(course.id)
								? 'Enrolled'
								: 'Not Enrolled'}
						</p>
						<EnrollButton
							courseId={course.id}
							studentId={student.id}
							enrolled={student.courses.includes(course.id)}
						/>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
