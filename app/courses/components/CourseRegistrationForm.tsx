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
import { toast } from '@/hooks/use-toast';
import { createCourse } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const studentFormSchema = z.object({
	title: z.string().min(2, {
		message: 'Course title must be at least 2 characters.',
	}),
	code: z.string().min(2, {
		message: 'Course code must be at least 2 characters.',
	}),
	credits: z.string().min(1, {
		message: 'Credit must be at least 1 characters.',
	}),
	semester: z.string().min(1, {
		message: 'Semester must be selected.',
	}),
	department: z.string().min(1, {
		message: 'Department must be at least 1 characters.',
	}),
});

export type CourseFormValues = z.infer<typeof studentFormSchema>;

export function CourseRegistrationForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const form = useForm<CourseFormValues>({
		resolver: zodResolver(studentFormSchema),
		defaultValues: {
			title: '',
			code: '',
			credits: '',
			semester: '',
			department: '',
		},
	});

	async function onSubmit(data: CourseFormValues) {
		setIsSubmitting(true);
		try {
			await createCourse(data);
			toast({
				title: 'Registration Successful',
				description: 'Course has been created successfully.',
			});
			form.reset();
			router.refresh();
		} catch (error) {
			toast({
				title: 'Registration Failed',
				description: 'There was an error creating the course.',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Course Creation Form</CardTitle>
				<CardDescription>
					Enter course details to register them in the system.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div defaultValue='personal' className='w-full'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							<div id='personal' className='space-y-4 mt-4'>
								<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
									<FormField
										control={form.control}
										name='title'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Course Title</FormLabel>
												<FormControl>
													<Input
														placeholder='Software Engineering'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='code'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Course Code</FormLabel>
												<FormControl>
													<Input placeholder='CPS 301' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='credits'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Course Credits (units)</FormLabel>
												<FormControl>
													<Input placeholder='3' {...field} />
												</FormControl>
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
														<SelectItem value='First Semester'>
															First Semester
														</SelectItem>
														<SelectItem value='Second Semester'>
															Second Semester
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='department'
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
														<SelectItem value='general-course'>
															General Course
														</SelectItem>
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
								</div>
							</div>
							<div className='flex justify-end'>
								<Button type='submit' disabled={isSubmitting}>
									{isSubmitting && (
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									)}
									Register Course
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</CardContent>
		</Card>
	);
}
