import { StudentsTable } from '@/components/students-table';
import { prisma } from '@/lib/client';
import React from 'react';

export default async function StudentTableWrapper() {
	const students = await prisma.student.findMany();
	return (
		<div>
			<StudentsTable students={students} />
		</div>
	);
}
