'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const studentFormSchema = z.object({
	firstName: z.string().min(2, {
		message: 'First name must be at least 2 characters.',
	}),
	middleName: z.string().min(2, {
		message: 'Middle name must be at least 2 characters.',
	}),
	lastName: z.string().min(2, {
		message: 'Last name must be at least 2 characters.',
	}),
	matricNo: z
		.string()
		.regex(/^FUO\/\d{2}\/\d{4}$/, 'Invalid matric number format'),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	phone: z.string().min(10, {
		message: 'Phone number must be at least 10 digits.',
	}),
	dateOfBirth: z.date({
		required_error: 'Date of birth is required.',
	}),
	gender: z.string({
		required_error: 'Please select a gender.',
	}),
	address: z.string().min(5, {
		message: 'Address must be at least 5 characters.',
	}),
	city: z.string().min(2, {
		message: 'City must be at least 2 characters.',
	}),
	state: z.string().min(2, {
		message: 'State must be at least 2 characters.',
	}),
	program: z.string({
		required_error: 'Please select a program.',
	}),
	semester: z.string({
		required_error: 'Please select a semester.',
	}),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

// This simulates saving to a database
async function saveStudent(data: StudentFormValues) {
	// Simulate API call
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('Student data saved:', data);
			resolve({
				success: true,
				id: Math.random().toString(36).substring(2, 9),
			});
		}, 1500);
	});
}

export function StudentRegistrationForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<StudentFormValues>({
		resolver: zodResolver(studentFormSchema),
		defaultValues: {
			firstName: '',
			middleName: '',
			lastName: '',
			email: '',
			phone: '',
			address: '',
			city: '',
			state: '',
		},
	});

	async function onSubmit(data: StudentFormValues) {
		setIsSubmitting(true);
		try {
			await saveStudent(data);
			toast({
				title: 'Registration Successful',
				description: 'Student has been registered successfully.',
			});
			form.reset();
		} catch (error) {
			toast({
				title: 'Registration Failed',
				description: 'There was an error registering the student.',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Student Registration Form</CardTitle>
				<CardDescription>
					Enter student details to register them in the system.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div defaultValue='personal' className='w-full'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							<div id='personal' className='space-y-4 mt-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='firstName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>First Name</FormLabel>
												<FormControl>
													<Input placeholder='John' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='lastName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name</FormLabel>
												<FormControl>
													<Input placeholder='Doe' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='middleName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Middle Name</FormLabel>
												<FormControl>
													<Input placeholder='Asake' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='matricNo'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Matric Number</FormLabel>
												<FormControl>
													<Input placeholder='FUO/22/00XX' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														placeholder='john.doe@example.com'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='phone'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone Number</FormLabel>
												<FormControl>
													<Input placeholder='090 4323 4411' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='dateOfBirth'
										render={({ field }) => (
											<FormItem className='flex flex-col'>
												<FormLabel>Date of Birth</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant={'outline'}
																className={cn(
																	'w-full pl-3 text-left font-normal',
																	!field.value && 'text-muted-foreground'
																)}
															>
																{field.value ? (
																	format(field.value, 'PPP')
																) : (
																	<span>Pick a date</span>
																)}
																<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className='w-auto p-0' align='start'>
														<Calendar
															mode='single'
															selected={field.value}
															onSelect={field.onChange}
															disabled={(date) =>
																date > new Date() ||
																date < new Date('1900-01-01')
															}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='gender'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Gender</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select gender' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value='male'>Male</SelectItem>
														<SelectItem value='female'>Female</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name='address'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Textarea placeholder='123 Main St' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
									<FormField
										control={form.control}
										name='city'
										render={({ field }) => (
											<FormItem>
												<FormLabel>City</FormLabel>
												<FormControl>
													<Input placeholder='Osogbo' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='state'
										render={({ field }) => (
											<FormItem>
												<FormLabel>State</FormLabel>
												<FormControl>
													<Input placeholder='Osun' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div id='academic' className='space-y-4 mt-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='program'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Program</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select program' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value='computer-science'>
															Computer Science
														</SelectItem>
														<SelectItem value='business-administration'>
															Business Administration
														</SelectItem>
														<SelectItem value='engineering'>
															Engineering
														</SelectItem>
														<SelectItem value='medicine'>Medicine</SelectItem>
														<SelectItem value='arts'>Arts</SelectItem>
														<SelectItem value='law'>Law</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='semester'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Semester</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select semester' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value='1st-2025'>
															1st Semester 2025
														</SelectItem>
														<SelectItem value='2nd-2025'>
															2nd Semester 2025
														</SelectItem>
														<SelectItem value='1st-2026'>
															1st Semester 2026
														</SelectItem>
														<SelectItem value='2nd-2026'>
															2nd Semester 2026
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className='flex justify-end'>
								<Button type='submit' disabled={isSubmitting}>
									{isSubmitting && (
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									)}
									Register Student
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</CardContent>
		</Card>
	);
}
