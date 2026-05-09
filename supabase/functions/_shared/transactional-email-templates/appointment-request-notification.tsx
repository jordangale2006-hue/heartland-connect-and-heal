/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  insurance?: string
  reason?: string
  preferredTime?: string
}

const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <>
      <Text style={labelStyle}>{label}</Text>
      <Text style={{ ...valueStyle, whiteSpace: 'pre-wrap' }}>{value}</Text>
      <Hr style={hr} />
    </>
  ) : null

const AppointmentRequestNotification = ({
  name = 'Unknown',
  email = '',
  phone = '',
  insurance = '',
  reason = '',
  preferredTime = '',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New appointment request from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New appointment request</Heading>
        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Phone" value={phone} />
          <Row label="Email" value={email} />
          <Row label="Insurance" value={insurance} />
          <Row label="Preferred contact time" value={preferredTime} />
          <Row label="Reason for visit" value={reason} />
        </Section>
        <Text style={footer}>
          Submitted via the Heartland Mental Health Services website. Reply to
          the patient at the email above to confirm scheduling.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AppointmentRequestNotification,
  subject: (data: Record<string, any>) =>
    `New appointment request${data?.name ? ` from ${data.name}` : ''}`,
  displayName: 'Appointment request notification (to staff)',
  to: 'heartlandmentalhealthservices@gmail.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '(520) 555-1234',
    insurance: 'Aetna',
    reason: 'Anxiety and trouble sleeping',
    preferredTime: 'Weekday mornings',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Source Sans 3', -apple-system, Helvetica, Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontFamily: "'Lora', Georgia, serif", fontSize: '24px', fontWeight: 600, color: 'hsl(220, 20%, 20%)', margin: '0 0 20px' }
const card = { backgroundColor: 'hsl(36, 40%, 95%)', borderRadius: '12px', padding: '20px 22px', margin: '0 0 20px' }
const labelStyle = { fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: 'hsl(220, 10%, 46%)', margin: '0 0 4px' }
const valueStyle = { fontSize: '15px', color: 'hsl(220, 20%, 20%)', lineHeight: '1.5', margin: '0 0 12px' }
const hr = { borderColor: 'hsl(36, 20%, 85%)', margin: '12px 0' }
const footer = { fontSize: '12px', color: 'hsl(220, 10%, 46%)', margin: '24px 0 0' }
