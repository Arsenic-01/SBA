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

interface FollowUpEmailProps {
  name: string;
  time: string;
  message: string; // Used for cancellation reason
  type: 'success' | 'cancellation';
}

export const FollowUpEmail = ({
  name,
  time,
  message,
  type,
}: FollowUpEmailProps) => {
  const isSuccess = type === 'success';
  const previewText = isSuccess
    ? `Your Appointment is Confirmed!`
    : `Your Appointment has been Cancelled`;
  const headingText = isSuccess
    ? 'Appointment Confirmed!'
    : 'Appointment Cancellation';

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              {headingText}
            </Heading>

            <Text className='text-left text-base text-slate-700'>
              Hi {name},
            </Text>
            <Text className='text-left text-base text-slate-700'>
              {isSuccess
                ? 'This email confirms your appointment has been successfully scheduled. Please find the details below.'
                : 'This email confirms that your appointment has been cancelled. Please see the details below.'}
            </Text>

            <Hr className='my-6 border-slate-200' />

            {/* Appointment Details */}
            <Section
              className={`rounded-lg p-6 border ${isSuccess ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            >
              <Text className='m-0 text-xs font-bold uppercase tracking-wider text-slate-500'>
                {isSuccess ? 'Scheduled Time' : 'Cancelled Time'}
              </Text>
              <Text className='m-0 mt-1 text-base text-slate-800'>{time}</Text>

              {isSuccess ? (
                <>
                  <Text className='m-0 mt-4 text-xs font-bold uppercase tracking-wider text-slate-500'>
                    Venue
                  </Text>
                  <Text className='m-0 mt-1 text-base text-slate-800'>
                    Regd. Office: 8, First Floor, Rambaug Society, Vidya Vikas
                    Circle, Gangapur Road, Nashik-422013
                  </Text>
                </>
              ) : (
                <>
                  <Text className='m-0 mt-4 text-xs font-bold uppercase tracking-wider text-slate-500'>
                    Cancellation Reason
                  </Text>
                  <Text className='m-0 mt-1 text-base text-slate-800'>
                    {message || 'No reason provided.'}
                  </Text>
                </>
              )}
            </Section>

            <Hr className='my-8 border-slate-200' />

            {/* Footer */}
            <Section className='text-center'>
              <Text className='text-xs text-slate-500'>
                Need to make changes or have questions? Contact us via our
                website.
              </Text>
              <Link
                href='https://sunilbhor.com/'
                className='text-xs text-slate-500 underline'
              >
                Visit Website
              </Link>
              <Text className='mt-4 text-xs text-slate-500'>
                SBA, Inc. ・ Vidya Vikas Circle, Gangapur Road ・ Nashik, 422013
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

FollowUpEmail.PreviewProps = {} as FollowUpEmailProps;

export default FollowUpEmail;
