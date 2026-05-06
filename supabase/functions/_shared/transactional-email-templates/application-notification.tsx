/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ApplicationNotificationProps {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  convicted?: string
  convictionDetails?: string
  fingerprintCard?: string
  resumeUrl?: string
  resumeFilename?: string
}

const ApplicationNotificationEmail = ({
  firstName = 'Unknown',
  lastName = '',
  email = 'unknown@example.com',
  phone = '',
  convicted = '',
  convictionDetails = '',
  fingerprintCard = '',
  resumeUrl,
  resumeFilename,
}: ApplicationNotificationProps) => {
  const fullName = `${firstName} ${lastName}`.trim()
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New job application from {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New job application</Heading>
          <Section style={card}>
            <Text style={label}>Name</Text>
            <Text style={value}>{fullName}</Text>
            <Hr style={hr} />
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
            <Hr style={hr} />
            <Text style={label}>Phone</Text>
            <Text style={value}>{phone}</Text>
            <Hr style={hr} />
            <Text style={label}>Convicted of a crime?</Text>
            <Text style={value}>{convicted}</Text>
            {convicted === 'yes' && convictionDetails ? (
              <>
                <Text style={label}>Conviction details</Text>
                <Text style={{ ...value, whiteSpace: 'pre-wrap' }}>{convictionDetails}</Text>
              </>
            ) : null}
            <Hr style={hr} />
            <Text style={label}>Valid Fingerprint Clearance Card?</Text>
            <Text style={value}>{fingerprintCard}</Text>
          </Section>

          {resumeUrl ? (
            <Section style={{ textAlign: 'center', margin: '8px 0 24px' }}>
              <Text style={text}>
                Resume: <strong>{resumeFilename ?? 'attached'}</strong>
              </Text>
              <Button href={resumeUrl} style={button}>
                Download resume
              </Button>
              <Text style={hint}>This link expires in 7 days.</Text>
            </Section>
          ) : (
            <Text style={text}>No resume was attached to this application.</Text>
          )}

          <Text style={footer}>
            Submitted via the Heartland Mental Health Services careers page.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ApplicationNotificationEmail,
  subject: (data: Record<string, any>) => {
    const name = `${data?.firstName ?? ''} ${data?.lastName ?? ''}`.trim()
    return `New job application${name ? ` from ${name}` : ''}`
  },
  displayName: 'Job application notification (to staff)',
  to: 'heartlandmentalhealthservices@gmail.com',
  previewData: {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    phone: '(555) 555-5555',
    convicted: 'no',
    fingerprintCard: 'yes',
    resumeUrl: 'https://example.com/resume.pdf',
    resumeFilename: 'jane-doe-resume.pdf',
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
const text = {
  fontSize: '15px',
  color: 'hsl(220, 20%, 25%)',
  lineHeight: '1.6',
  margin: '0 0 12px',
}
const button = {
  backgroundColor: 'hsl(22, 85%, 55%)',
  color: '#ffffff',
  padding: '12px 22px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-block',
}
const hint = {
  fontSize: '12px',
  color: 'hsl(220, 10%, 46%)',
  margin: '10px 0 0',
}
const footer = {
  fontSize: '12px',
  color: 'hsl(220, 10%, 46%)',
  margin: '24px 0 0',
}
