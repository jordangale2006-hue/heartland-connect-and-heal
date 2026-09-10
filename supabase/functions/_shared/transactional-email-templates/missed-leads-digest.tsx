/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Appointment {
  createdAt?: string
  name?: string
  phone?: string
  email?: string
  insurance?: string
  preferredTime?: string
  reason?: string
  status?: string
}

interface Message {
  createdAt?: string
  name?: string
  email?: string
  message?: string
}

interface Props {
  appointments?: Appointment[]
  messages?: Message[]
}

const Field = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Text style={fieldStyle}>
      <span style={labelStyle}>{label}: </span>
      <span style={{ whiteSpace: 'pre-wrap' }}>{value}</span>
    </Text>
  ) : null

const MissedLeadsDigest = ({ appointments = [], messages = [] }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      {`Catch-up: ${appointments.length} appointment requests and ${messages.length} messages`}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Website leads catch-up</Heading>
        <Text style={intro}>
          These are all the appointment requests and contact messages stored from
          the Heartland Mental Health Services website. Going forward, each new
          submission is emailed to this address automatically.
        </Text>

        <Heading style={h2}>
          {`Appointment requests (${appointments.length})`}
        </Heading>
        {appointments.length === 0 ? (
          <Text style={fieldStyle}>None.</Text>
        ) : (
          appointments.map((a, i) => (
            <Section key={`a-${i}`} style={card}>
              <Text style={cardTitle}>
                {`${i + 1}. ${a.name || 'Unknown'}`}
                {a.createdAt ? ` — ${a.createdAt}` : ''}
              </Text>
              <Field label="Phone" value={a.phone} />
              <Field label="Email" value={a.email} />
              <Field label="Insurance" value={a.insurance} />
              <Field label="Preferred contact time" value={a.preferredTime} />
              <Field label="Reason for visit" value={a.reason} />
              <Field label="Status" value={a.status} />
            </Section>
          ))
        )}

        <Hr style={hr} />

        <Heading style={h2}>{`Contact messages (${messages.length})`}</Heading>
        {messages.length === 0 ? (
          <Text style={fieldStyle}>None.</Text>
        ) : (
          messages.map((m, i) => (
            <Section key={`m-${i}`} style={card}>
              <Text style={cardTitle}>
                {`${i + 1}. ${m.name || 'Unknown'}`}
                {m.createdAt ? ` — ${m.createdAt}` : ''}
              </Text>
              <Field label="Email" value={m.email} />
              <Field label="Message" value={m.message} />
            </Section>
          ))
        )}

        <Text style={footer}>
          Sent once as a catch-up from the Heartland Mental Health Services
          website. Reply directly to each person at the email or phone listed.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: MissedLeadsDigest,
  subject: (data: Record<string, any>) =>
    `Website leads catch-up: ${data?.appointments?.length ?? 0} appointment requests, ${data?.messages?.length ?? 0} messages`,
  displayName: 'Missed leads catch-up digest (to staff)',
  to: 'infor@heartlandmhservices.com',
  previewData: {
    appointments: [
      {
        createdAt: 'May 6, 2026',
        name: 'Jane Doe',
        phone: '(520) 555-1234',
        email: 'jane@example.com',
        insurance: 'Aetna',
        preferredTime: 'Weekday mornings',
        reason: 'Anxiety and trouble sleeping',
        status: 'new',
      },
    ],
    messages: [
      {
        createdAt: 'May 8, 2026',
        name: 'John Smith',
        email: 'john@example.com',
        message: 'Do you accept Medicare for telehealth visits?',
      },
    ],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Source Sans 3', -apple-system, Helvetica, Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '640px' }
const h1 = { fontFamily: "'Lora', Georgia, serif", fontSize: '24px', fontWeight: 600, color: 'hsl(220, 20%, 20%)', margin: '0 0 12px' }
const h2 = { fontFamily: "'Lora', Georgia, serif", fontSize: '18px', fontWeight: 600, color: 'hsl(220, 20%, 20%)', margin: '24px 0 12px' }
const intro = { fontSize: '15px', color: 'hsl(220, 20%, 20%)', lineHeight: '1.6', margin: '0 0 8px' }
const card = { backgroundColor: 'hsl(36, 40%, 95%)', borderRadius: '12px', padding: '16px 18px', margin: '0 0 12px' }
const cardTitle = { fontSize: '15px', fontWeight: 600, color: 'hsl(220, 20%, 20%)', margin: '0 0 8px' }
const fieldStyle = { fontSize: '14px', color: 'hsl(220, 20%, 20%)', lineHeight: '1.5', margin: '0 0 4px' }
const labelStyle = { fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'hsl(220, 10%, 46%)' }
const hr = { borderColor: 'hsl(36, 20%, 85%)', margin: '24px 0' }
const footer = { fontSize: '12px', color: 'hsl(220, 10%, 46%)', margin: '24px 0 0' }
