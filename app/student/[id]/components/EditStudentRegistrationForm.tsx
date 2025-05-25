'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
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
import { toast } from '@/hooks/use-toast';
import { registerStudent, updateStudent } from '@/lib/actions';
import { useRouter } from 'next/navigation';

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
	phone: z.string().min(9, {
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

export type StudentFormValues = z.infer<typeof studentFormSchema>;

export function EditStudentRegistrationForm({ student }: { student: any }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const form = useForm<StudentFormValues>({
		resolver: zodResolver(studentFormSchema),
		defaultValues: {
			firstName: student.firstName,
			middleName: student.middleName,
			lastName: student.lastName,
			matricNo: student.matricNo,
			email: student.email,
			phone: student.phone,
			address: student.address,
			city: student.city,
			state: student.state,
			program: student.program,
			semester: student.semester,
			gender: student.gender,
			dateOfBirth: student.dateOfBirth,
		},
	});

	async function onSubmit(data: StudentFormValues) {
		setIsSubmitting(true);
		try {
			const formatedData = { ...data, createdAt: new Date(), courses: [''] };
			await updateStudent(student.id, formatedData);
			toast({
				title: 'Update Successful',
				description: 'Student has been updated successfully.',
			});
			router.refresh();
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
				<CardTitle>Edit Student Information</CardTitle>
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
												<div className='flex items-center gap-1'>
													<p>+234</p>
													<FormControl>
														<Input placeholder='9043238411' {...field} />
													</FormControl>
												</div>
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
												<input
													className='border p-2'
													type='date'
													value={
														field.value
															? field.value.toISOString().split('T')[0]
															: ''
													}
													onChange={(e) =>
														field.onChange(new Date(e.target.value))
													}
												/>
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
													value={field.value}
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
													value={field.value}
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
													value={field.value}
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
									Update Student
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</CardContent>
		</Card>
	);
}
