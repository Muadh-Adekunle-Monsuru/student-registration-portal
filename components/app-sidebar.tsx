'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	BarChart3,
	BookOpen,
	FileText,
	Home,
	Settings,
	UserPlus,
	Users,
} from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';

// Navigation items
const navItems = [
	{
		title: 'Dashboard',
		icon: Home,
		href: '/dashboard',
	},
	{
		title: 'Registration',
		icon: UserPlus,
		href: '/registration',
	},
	{
		title: 'Students',
		icon: Users,
		href: '/students',
	},
	{
		title: 'Courses',
		icon: BookOpen,
		href: '/courses',
	},
];

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader className='border-b'>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg' asChild>
							<Link href='/dashboard'>
								<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
									<BookOpen className='size-4' />
								</div>
								<div className='flex flex-col gap-0.5 leading-none'>
									<span className='font-semibold'>School Managment System</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					{navItems.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								isActive={pathname === item.href}
								tooltip={item.title}
							>
								<Link href={item.href}>
									<item.icon className='size-4' />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className='border-t p-4'>
				<div className='flex items-center justify-between'>
					<div className='text-sm text-muted-foreground'>
						© 2025 Student Portal
					</div>
					<ModeToggle />
				</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
