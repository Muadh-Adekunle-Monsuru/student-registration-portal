import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function StudentNotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4'>
			<div className='text-center space-y-4'>
				<h1 className='text-4xl font-bold'>Student Not Found</h1>
				<p className='text-muted-foreground'>
					The student you're looking for doesn't exist or has been removed.
				</p>
				<Button asChild>
					<Link href='/students'>Return to Students List</Link>
				</Button>
			</div>
		</div>
	);
}
