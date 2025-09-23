'use client';

import { Button, Input, Textarea } from '@nextui-org/react';
import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaCopy,
  FaCheck,
} from 'react-icons/fa6';
import { toast } from 'sonner';
import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import { Bitter } from 'next/font/google';
import { useCallback, useState } from 'react';

const bitter = Bitter({ subsets: ['latin'] });

const CopyableContactItem = ({
  icon,
  href,
  text,
  copyValue,
  type,
}: {
  icon: React.ReactNode;
  href: string;
  text: string;
  copyValue: string;
  type: 'Email' | 'Phone';
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(copyValue)
      .then(() => {
        setIsCopied(true);
        toast.success(`${type} copied to clipboard!`);
        setTimeout(() => setIsCopied(false), 2500);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy to clipboard.');
      });
  }, [copyValue, type]);

  return (
    <div
      className='group relative flex w-full cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-white/10'
      onClick={handleCopy}
    >
      <a
        href={href}
        onClick={(e) => e.stopPropagation()}
        target='_blank'
        rel='noopener noreferrer'
        className='z-10 inline-flex items-center gap-5 text-slate-300 transition-colors group-hover:text-white'
        aria-label={text}
      >
        {icon}
        <span className='font-light'>{text}</span>
      </a>
      <div className='text-slate-400 transition-all duration-200'>
        {isCopied ? (
          <FaCheck className='text-emerald-400' />
        ) : (
          <FaCopy className='opacity-0 group-hover:opacity-100' />
        )}
      </div>
    </div>
  );
};

// Define the validation schema using Zod
const contactSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(1, 'Name is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message should be at least 10 characters long'),
});

const ContactPage = () => {
  Sentry.metrics.set('user_view_contact', 'client');

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    },
    [formData]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const formErrors = validation.error.flatten().fieldErrors;
      setErrors({
        email: formErrors.email?.[0] || '',
        name: formErrors.name?.[0] || '',
        subject: formErrors.subject?.[0] || '',
        message: formErrors.message?.[0] || '',
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Email sent successfully. 🎉');
      } else {
        toast.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error occurred while sending email:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setFormData({ email: '', name: '', subject: '', message: '' });
      setErrors({ email: '', name: '', subject: '', message: '' });
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto'>
      <div className='py-20 sm:py-28 md:px-8'>
        <h1
          className={`${bitter.className} hidden sm:block sm:text-4xl text-center lg:text-left px-8`}
        >
          let's work together
          <span className='text-[#EF4444] sm:text-5xl xl:text-[52px]'>.</span>
        </h1>
        <h1 className='text-4xl font-medium sm:hidden mt-8 text-center md:text-left px-8'>
          get in touch
          <span className='text-[#EF4444] sm:text-5xl lg:text-[52px]'>.</span>
        </h1>

        <div className='xl:max-w-5xl 2xl:max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 sm:px-4 '>
          {/* Contact Form */}
          <div className='px-5 sm:px-4 sm:py-2 pb-2'>
            <form className='mt-12' onSubmit={handleSubmit}>
              <div className='mt-4 relative'>
                <Input
                  size='sm'
                  type='email'
                  isRequired
                  name='email'
                  label='Email'
                  value={formData.email}
                  onChange={handleChange}
                  aria-label='Your email address'
                />
                {errors.email && (
                  <div className='text-red-500 text-sm'>{errors.email}</div>
                )}
              </div>
              <div className='mt-8 relative'>
                <Input
                  size='sm'
                  type='text'
                  isRequired
                  name='name'
                  label='Your Name'
                  value={formData.name}
                  onChange={handleChange}
                  aria-label='Your full name'
                />
                {errors.name && (
                  <div className='text-red-500 text-sm'>{errors.name}</div>
                )}
              </div>
              <div className='mt-8 relative'>
                <Input
                  size='sm'
                  type='text'
                  isRequired
                  name='subject'
                  label='Subject'
                  value={formData.subject}
                  onChange={handleChange}
                  aria-label='Subject of your message'
                />
                {errors.subject && (
                  <div className='text-red-500 text-sm'>{errors.subject}</div>
                )}
              </div>
              <div className='mt-8 relative'>
                <Textarea
                  isRequired
                  name='message'
                  label='Message'
                  value={formData.message}
                  placeholder='What Are You Looking For, Features / Specifications, Application / Usage, site location, etc'
                  onChange={handleChange}
                  aria-label='Your message'
                  minRows={20}
                />
                {errors.message && (
                  <div className='text-red-500 text-sm'>{errors.message}</div>
                )}
              </div>
              <div className='mt-8 md:mt-10 relative'>
                <Button
                  color='primary'
                  type='submit'
                  variant='shadow'
                  className='w-full text-sm'
                  isDisabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message 🚀'}
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Details */}
          <div className='py-3 md:mt-5'>
            <div className='py-4 mb-7 px-4 rounded-xl'>
              <h2 className='text-2xl text-center sm:text-left font-medium mb-6'>
                Contact Details
              </h2>
              <div className='flex flex-col gap-1'>
                <div className='text-slate-300 inline-flex gap-5 sm:gap-7 items-center px-3'>
                  <FaLocationDot className='sm:size-6 size-8' />
                  <p className='text-pretty tracking-tight	'>
                    Regd. Office: 8, First Floor, Rambaug Society, Vidya Vikas
                    Circle, Gangapur Road, Nashik-422013
                  </p>
                </div>

                <CopyableContactItem
                  href='mailto:sdbhor@gmail.com'
                  text='sdbhor@gmail.com'
                  copyValue='sdbhor@gmail.com'
                  icon={<FaEnvelope className='w-5 h-5 flex-shrink-0' />}
                  type='Email'
                />
                <CopyableContactItem
                  href='mailto:sba.nashik@gmail.com'
                  text='sba.nashik@gmail.com'
                  copyValue='sba.nashik@gmail.com'
                  icon={<FaEnvelope className='w-5 h-5 flex-shrink-0' />}
                  type='Email'
                />
                <CopyableContactItem
                  href='tel:02534053076'
                  text='Landline Ph. (0253) 4053076'
                  copyValue='02534053076'
                  icon={<FaPhone className='w-5 h-5 flex-shrink-0' />}
                  type='Phone'
                />
                <CopyableContactItem
                  href='tel:+919156387366'
                  text='Office Mobile +91 91563 87366'
                  copyValue='9156387366'
                  icon={<FaPhone className='w-5 h-5 flex-shrink-0' />}
                  type='Phone'
                />
                <CopyableContactItem
                  href='tel:+919822377366'
                  text='+91 98223 77366'
                  copyValue='9822377366'
                  icon={<FaPhone className='w-5 h-5 flex-shrink-0' />}
                  type='Phone'
                />
                <CopyableContactItem
                  href='tel:+917972418920'
                  text='+91 79724 18920'
                  copyValue='7972418920'
                  icon={<FaPhone className='w-5 h-5 flex-shrink-0' />}
                  type='Phone'
                />
              </div>
            </div>
            {/* Google Maps Embed */}
            <div className='text-center mx-auto px-5'>
              <iframe
                className='rounded-lg w-full'
                src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14995.89229266695!2d73.7664801!3d20.0096448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddea4d3d397d1f%3A0x69841f86cbb89521!2sSunil%20Bhor%20and%20Associates!5e0!3m2!1sen!2sin!4v1719696639207!5m2!1sen!2sin'
                width={400}
                height={200}
                style={{ border: 0, borderRadius: 20 }}
                allowFullScreen={true}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                aria-label='Google Maps showing office location'
                title='Office Location'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
