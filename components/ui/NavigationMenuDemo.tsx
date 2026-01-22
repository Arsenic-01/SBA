'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import * as React from 'react';

import { useRouter } from 'next/navigation';
const aboutData = [
  {
    title: '🌐 About Company',
    description: 'Learn more about SBA',
    href: '/about',
  },
  {
    title: '🏆 Awards and Recognition',
    description: 'Our achievements and accolades',
    href: '/about/awards-and-recognition',
  },
  {
    title: '📜 Certifications & Licenses',
    description: 'Our official certifications and licenses',
    href: '/about/certifications-and-licenses',
  },
];
const serviceData = [
  {
    id: 1,
    title: 'Architectural Planning',
  },
  {
    id: 2,
    title: 'Town Planning Approvals',
  },
  {
    id: 3,
    title: 'NA Conversion of Lands',
  },
  {
    id: 4,
    title: 'Real Estate Advisory',
  },
  {
    id: 5,
    title: 'Valuation Consultancy',
  },
  {
    id: 6,
    title: 'Plant and Machinery Valuation',
  },
  {
    id: 7,
    title: 'Chartered Engineer Certifications',
  },
  {
    id: 8,
    title: 'Factory Act Certification',
  },
  {
    id: 9,
    title: 'NDT Testing & Stability Certification',
  },
  {
    id: 10,
    title: 'Surveying & Monitoring',
  },
  {
    id: 11,
    title: 'Industrial Safety Audits',
  },
  {
    id: 12,
    title: 'IPO Certification',
  },
  {
    id: 13,
    title: 'TEV Consultancy',
  },
  {
    id: 14,
    title: 'Structural Designing',
  },
  {
    id: 15,
    title: 'Interior Designing',
  },
  {
    id: 16,
    title: 'Black Money Valuation',
  },
  {
    id: 17,
    title: 'Tender and specs drawing',
  },
  {
    id: 18,
    title: 'Lender’s independent engineers',
  },
  {
    id: 19,
    title: 'Mould certification',
  },
  {
    id: 20,
    title: 'Import Machinery certification',
  },
];

const NavigationMenuContents = () => {
  const router = useRouter();

  const handleLinkClick = (id: number) => {
    // Redirect to /services with service ID as query parameter
    router.push(`/services?serviceId=${id}`);
  };

  return (
    <NavigationMenu
      role='navigation'
      aria-label='Service and information links'
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-haspopup='true'>
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent className='left-0'>
            <ul
              className='grid gap-1 p-4 w-[500px] grid-cols-2 lg:w-[600px]'
              aria-label='Service list'
            >
              {serviceData.map((service) => (
                <ListItem
                  key={service.id}
                  title={service.title}
                  // description={service.description}
                  className='hover:cursor-pointer'
                  onClick={() => handleLinkClick(service.id)}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href='/projects' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Projects
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger aria-haspopup='true'>
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent className='left-0'>
            <ul className='grid grid-cols-1 w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
              {aboutData.map((component, index) => (
                <ListItem
                  className=' hover:cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800/70 rounded-md'
                  key={index}
                  title={component.title}
                  description={component.description}
                  href={component.href}
                  onClick={() => {
                    router.push(component.href);
                  }}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href='/contact' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuContents;

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string;
    description?: string;
    onClick: () => void;
  }
>(({ title, description, onClick, className, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        onClick={onClick}
        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
        {...props}
        aria-label={`View details for ${title}`}
      >
        <div className='text-sm font-medium leading-none'>{title}</div>
        {description && (
          <p className='py-2 text-sm leading-snug text-muted-foreground'>
            {description}
          </p>
        )}
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = 'ListItem';
