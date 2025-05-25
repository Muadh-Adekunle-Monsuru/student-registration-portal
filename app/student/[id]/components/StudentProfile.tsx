'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Student } from '@prisma/client';
import { ArrowLeft, Calendar, Edit, Mail, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface StudentProfileProps {
	student: Student;
}

export function StudentProfile({ student }: StudentProfileProps) {
	const [activeTab, setActiveTab] = useState('overview');

	// Get student initials for avatar
	const initials = `${student.firstName.charAt(0)}${student.lastName.charAt(
		0
	)}`;

	return (
		<div className='space-y-6'>
			<div className='grid gap-4 md:grid-cols-8 w-full'>
				<div className='md:col-span-3 space-y-6'>
					<Card>
						<CardHeader className='flex flex-row items-center gap-4 space-y-0'>
							<Avatar className='h-16 w-16'>
								<AvatarFallback className='text-xl'>{initials}</AvatarFallback>
							</Avatar>
							<div className='space-y-1'>
								<CardTitle>
									{student.firstName} {student.lastName}
								</CardTitle>
								<CardDescription>{student.matricNo}</CardDescription>
							</div>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<div className='flex items-center gap-2 text-sm'>
									<Mail className='h-4 w-4 text-muted-foreground' />
									<span>{student.email}</span>
								</div>
								<div className='flex items-center gap-2 text-sm'>
									<User className='h-4 w-4 text-muted-foreground' />
									<span>{student.gender}</span>
								</div>
								<div className='flex items-center gap-2 text-sm'>
									<Calendar className='h-4 w-4 text-muted-foreground' />
									<span>{student.dateOfBirth.toDateString()}</span>
								</div>
								<div className='flex items-start gap-2 text-sm'>
									<MapPin className='h-4 w-4 text-muted-foreground mt-0.5' />
									<div>
										<p>{student.address}</p>
										<p>
											{student.city}, {student.state}
										</p>
									</div>
								</div>
							</div>

							<Separator />

							<div>
								<h3 className='font-medium mb-2'>Program Information</h3>
								<div className='grid grid-cols-2 gap-2 text-sm'>
									<div className='text-muted-foreground'>Program</div>
									<div>{student.program}</div>
									<div className='text-muted-foreground'>Current Semester</div>
									<div>{student.semester}</div>
									<div className='text-muted-foreground'>Registration Date</div>
									<div>{student.createdAt.toDateString()}</div>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button variant='outline' className='w-full'>
								<Link href={`/student/${student.id}/edit`}>
									<Edit className='mr-2 h-4 w-4' />
									Edit Profile
								</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>

				<div className='md:col-span-5'>
					<Card>
						<CardHeader>
							<CardTitle>Student Course Form</CardTitle>
						</CardHeader>
						<CardContent></CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
