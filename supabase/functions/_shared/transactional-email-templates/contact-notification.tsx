/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ContactNotificationProps {
  name?: string
  email?: string
  message?: string
}

const ContactNotificationEmail = ({
  name = 'Unknown',
  email = 'unknown@example.com',
  message = '(no message)',
}: ContactNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New contact form submission</Heading>
        <Section style={card}>
          <Text style={label}>From</Text>
          <Text style={value}>{name}</Text>
          <Hr style={hr} />
          <Text style={label}>Email</Text>
          <Text style={value}>{email}</Text>
          <Hr style={hr} />
          <Text style={label}>Message</Text>
          <Text style={{ ...value, whiteSpace: 'pre-wrap' }}>{message}</Text>
        </Section>
        <Text style={footer}>
          Submitted via the Heartland Mental Health Services website.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New contact form submission${data?.name ? ` from ${data.name}` : ''}`,
  displayName: 'Contact form notification (to staff)',
  to: 'heartlandmentalhealthservices@gmail.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Hi, I would like to schedule an appointment.',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Source Sans 3', -apple-system, Helvetica, Arial, sans-serif",
}
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = {
  fontFamily: "'Lora', Georgia, serif",
  fontSize: '24px',
  fontWeight: 600,
  color: 'hsl(220, 20%, 20%)',
  margin: '0 0 20px',
}
const card = {
  backgroundColor: 'hsl(36, 40%, 95%)',
  borderRadius: '12px',
  padding: '20px 22px',
  margin: '0 0 20px',
}
const label = {
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  color: 'hsl(220, 10%, 46%)',
  margin: '0 0 4px',
}
const value = {
  fontSize: '15px',
  color: 'hsl(220, 20%, 20%)',
  lineHeight: '1.5',
  margin: '0 0 12px',
}
const hr = { borderColor: 'hsl(36, 20%, 85%)', margin: '12px 0' }
const footer = {
  fontSize: '12px',
  color: 'hsl(220, 10%, 46%)',
  margin: '24px 0 0',
}
