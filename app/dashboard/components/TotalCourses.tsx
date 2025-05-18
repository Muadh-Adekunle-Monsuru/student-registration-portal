import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/client';
import { School } from 'lucide-react';
import React from 'react';

export default async function TotalCourses() {
	const res = await prisma.courses.count();
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>Active Courses</CardTitle>
				<School className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{res}</div>
				<p className='text-xs text-muted-foreground'>
					+2 new courses this session
				</p>
			</CardContent>
		</Card>
	);
}
