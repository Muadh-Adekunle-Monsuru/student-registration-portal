'use server';

import { StudentFormValues } from '@/components/student-registration-form';
import { prisma } from './client';
import { Student } from '@prisma/client';

export async function registerStudent(values: any) {
	const res = await prisma.student.create({
		data: {
			...values,
		},
	});
}

export async function createCourse(values: any) {
	const res = await prisma.courses.create({
		data: {
			...values,
		},
	});
	return res;
}

export async function updateStudent(id: string, values: any) {
	const res = await prisma.student.update({
		where: {
			id,
		},
		data: {
			...values,
		},
	});
	return res;
}

export async function deleteCourse(id: string) {
	const res = await prisma.courses.delete({
		where: {
			id,
		},
	});
	return res;
}

export async function deleteStudent(id: string) {
	const res = await prisma.student.delete({
		where: {
			id,
		},
	});
	return res;
}

export async function getStudentById(id: string) {
	const res = await prisma.student.findUnique({
		where: {
			id,
		},
	});
	return res;
}
