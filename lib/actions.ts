'use server';

import { prisma } from './client';

export async function registerStudent(values: any) {
	const res = await prisma.student.create({
		data: {
			...values,
		},
	});
}
