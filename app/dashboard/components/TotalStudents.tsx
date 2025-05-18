import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/client';
import { Users } from 'lucide-react';
import React from 'react';

export default async function TotalStudents() {
	const total = await prisma.student.count();
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>Total Students</CardTitle>
				<Users className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{total}</div>
				<p className='text-xs text-muted-foreground'>+2% from last semester</p>
			</CardContent>
		</Card>
	);
}
