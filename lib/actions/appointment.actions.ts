'use server';

import { revalidatePath } from 'next/cache';
import { ID, Query } from 'node-appwrite';

import { Appointment } from '@/types/appwrite.types';
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from '../appwrite.config';
import { formatDateTime, parseStringify } from '../utils';
import { CreateAppointmentParams, UpdateAppointmentParams } from '@/types';
import { getClient } from './client.actions';
import { Resend } from 'resend';
import { FollowUpEmail } from '@/emails/FollowUpEmail';
import SendAdminEmail from '@/emails/SendAdminEmail';

const resend = new Resend(process.env.RESEND_API_KEY!);

// Utility for sending email notifications
const sendEmail = async ({
  to,
  subject,
  reactComponent,
  from = 'Appointment@sunilbhor.com',
}: {
  to: string;
  subject: string;
  reactComponent: JSX.Element;
  from?: string;
}) => {
  try {
    await resend.emails.send({
      from,
      to,
      subject,
      react: reactComponent,
    });
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
};

// CREATE APPOINTMENT
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    revalidatePath('/admin');

    await Promise.all([sendAdminEmailNotification(newAppointment)]);

    return parseStringify(newAppointment);
  } catch (error) {
    console.error('Error creating new appointment:', error);
  }
};

// SEND ADMIN EMAIL NOTIFICATION
export const sendAdminEmailNotification = async (appointment: any) => {
  const subject = `New Appointment from ${appointment.client.name}`;
  const emailContent = SendAdminEmail({
    name: appointment.client.name,
    email: appointment.client.email,
    time: formatDateTime(appointment.schedule).dateTime,
    phone: appointment.client.phone,
    message: appointment.reason || 'No message provided',
  });

  await sendEmail({
    to: 'vedbhor25@gmail.com',
    subject,
    reactComponent: emailContent,
  });
  await sendEmail({
    to: 'sdbhor@gmail.com',
    subject,
    reactComponent: emailContent,
  });
};

// GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    );

    // Type assertion to ensure the documents are treated as an array of Appointment
    const appointmentDocs = appointments.documents as Appointment[];

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointmentDocs.reduce((acc, appointment) => {
      switch (appointment.status) {
        case 'scheduled':
          acc.scheduledCount++;
          break;
        case 'pending':
          acc.pendingCount++;
          break;
        case 'cancelled':
          acc.cancelledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointmentDocs,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      'An error occurred while retrieving the recent appointments:',
      error
    );
  }
};

// SEND FOLLOW-UP EMAIL NOTIFICATION
export const sendFollowUpEmailNotification = async (appointment: any) => {
  const isScheduled = appointment.status === 'scheduled';
  const subject = `Appointment ${isScheduled ? 'Scheduled' : 'Cancelled'}: ${formatDateTime(appointment.schedule).dateTime}`;
  const body = isScheduled
    ? `Greetings from SBA. Your appointment is confirmed for ${formatDateTime(appointment.schedule).dateTime} with Mr. Sunil D. Bhor.`
    : `We regret to inform you that your appointment for ${formatDateTime(appointment.schedule).dateTime} is cancelled. Reason: ${appointment.cancellationReason || 'No reason provided.'}`;

  const emailContent = FollowUpEmail({
    name: appointment.client.name,
    time: formatDateTime(appointment.schedule).dateTime,
    message: appointment.cancellationReason || 'No message provided',
    type: isScheduled ? 'success' : 'cancellation',
  });

  await sendEmail({
    to: appointment.client.email,
    subject,
    reactComponent: emailContent,
  });
};

// UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw new Error('Appointment update failed');

    const client = await getClient(userId);
    await Promise.all([sendFollowUpEmailNotification(updatedAppointment)]);

    revalidatePath('/admin');
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error('Error retrieving appointment:', error);
  }
};
