import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface EmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactEmail = ({ name, email, subject, message }: EmailProps) => (
  <Html>
    <Head />
    <Preview>{`New SBA Inquiry: ${subject}`}</Preview>
    <Tailwind>
      <Body className='bg-slate-100 font-sans'>
        <Container className='mx-auto my-10 max-w-2xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm'>
          {/* Header Section */}
          <Section className='text-center'>
            <Img
              src='https://res.cloudinary.com/dmdci86wv/image/upload/fl_preserve_transparency/v1725786410/nav_red_ro2bcc.jpg?_s=public-apps'
              width='50'
              height='70'
              alt='SBA Logo'
              className='mx-auto'
            />
          </Section>

          <Heading className='mt-6 text-center text-2xl font-bold text-slate-800'>
            New Contact Form Submission
          </Heading>

          <Text className='text-center text-slate-600'>
            Hello Admin, you've received a new message via your website.
          </Text>

          <Hr className='my-6 border-slate-200' />

          {/* Submission Details Section */}
          <Section className='rounded-lg bg-slate-50 p-6 border border-slate-200'>
            <Text className='m-0 text-xs font-bold uppercase tracking-wider text-slate-500'>
              From
            </Text>
            <Text className='m-0 mt-1 text-base text-slate-800'>{name}</Text>

            <Text className='m-0 mt-4 text-xs font-bold uppercase tracking-wider text-slate-500'>
              Sender's Email
            </Text>
            <Link
              href={`mailto:${email}`}
              className='m-0 mt-1 block text-base text-red-600 underline'
            >
              {email}
            </Link>

            <Text className='m-0 mt-4 text-xs font-bold uppercase tracking-wider text-slate-500'>
              Subject
            </Text>
            <Text className='m-0 mt-1 text-base text-slate-800'>{subject}</Text>
          </Section>

          <Hr className='my-6 border-slate-200' />

          {/* Message Section */}
          <Section>
            <Text className='m-0 mb-4 text-xs font-bold uppercase tracking-wider text-slate-500'>
              Message
            </Text>
            <div className='whitespace-pre-wrap rounded-md border border-slate-200 bg-white p-4 leading-relaxed text-slate-800'>
              {message}
            </div>
          </Section>

          {/* Action Button */}
          <Section className='mt-8 text-center'>
            <Link
              href={`mailto:${email}`}
              className='inline-block rounded-md bg-red-600 px-6 py-3 text-sm font-medium text-white shadow-md'
            >
              Reply to {name}
            </Link>
          </Section>

          <Hr className='my-8 border-slate-200' />

          {/* Footer */}
          <Section className='text-center'>
            <Text className='text-xs text-slate-500'>
              <Link
                href='https://sunilbhor.com/'
                className='text-slate-500 underline'
              >
                Website
              </Link>
              {' ・ '}
              <Link
                href='https://sunilbhor.com/admin'
                className='text-slate-500 underline'
              >
                Admin Panel
              </Link>
            </Text>
            <Text className='text-xs text-slate-500'>
              SBA, Inc. ・ Vidya Vikas Circle, Gangapur Road ・ Nashik, 422013
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

ContactEmail.PreviewProps = {} as EmailProps;

export default ContactEmail;
