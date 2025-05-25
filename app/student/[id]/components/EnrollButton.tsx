'use client';
import { Button } from '@/components/ui/button';
import { addCourse, dropCourse } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function EnrollButton({
	studentId,
	courseId,
	enrolled,
}: {
	studentId: string;
	courseId: string;
	enrolled: boolean;
}) {
	const router = useRouter();
	const handleSubmit = async () => {
		await addCourse(courseId, studentId);
		router.refresh();
	};
	const handleDrop = async () => {
		await dropCourse(courseId, studentId);
		router.refresh();
	};
	return (
		<div>
			{enrolled ? (
				<Button variant='outline' size={'sm'} onClick={handleDrop}>
					Drop
				</Button>
			) : (
				<Button variant='outline' size={'sm'} onClick={handleSubmit}>
					Add
				</Button>
			)}
		</div>
	);
}
