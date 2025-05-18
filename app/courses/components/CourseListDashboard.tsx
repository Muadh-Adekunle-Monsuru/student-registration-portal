import { prisma } from '@/lib/client';
import React from 'react';
import { CourseListTable } from './CourseListTable';

export default async function CourseListDashboard() {
	const res = await prisma.courses.findMany();
	return (
		<div className='my-10'>
			<CourseListTable courses={res} />
		</div>
	);
}
