import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/client';
import { GraduationCap } from 'lucide-react';
import React from 'react';

export default async function NewRegistrations() {
	const res = await prisma.student.count({
		where: {
			createdAt: {
				gte: new Date(new Date().setDate(new Date().getDate() - 7)),
			},
		},
	});
	// const [currentDate, setCurrentDate] = React.useState(
	// 	new Date(new Date().setDate(new Date().getDate() - 7))
	// );
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>New Registrations</CardTitle>
				<GraduationCap className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{res}</div>
				{/* <div className='text-2xl font-bold'>{currentDate.toDateString()}</div> */}
				<p className='text-xs text-muted-foreground'>+4% from last week</p>
			</CardContent>
		</Card>
	);
}
