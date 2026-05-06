/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Heartland Mental Health Services'

interface ApplicationConfirmationProps {
  firstName?: string
}

const ApplicationConfirmationEmail = ({ firstName }: ApplicationConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We received your application — thank you for your interest</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {firstName ? `Thank you, ${firstName}` : 'Thank you for applying'}
        </Heading>
        <Text style={text}>
          We received your application to join the {SITE_NAME} team. Our team
          reviews every application carefully and will reach out if your
          background is a match for an open role.
        </Text>
        <Section style={card}>
          <Text style={cardText}>
            We appreciate the time and care you put into applying. If we have
            questions or would like to schedule a conversation, we'll contact
            you at the email or phone number you provided.
          </Text>
        </Section>
        <Text style={signoff}>Warmly,<br />The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ApplicationConfirmationEmail,
  subject: 'We received your application — Heartland Mental Health Services',
  displayName: 'Job application confirmation (to applicant)',
  previewData: { firstName: 'Jane' },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Source Sans 3', -apple-system, Helvetica, Arial, sans-serif",
}
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = {
  fontFamily: "'Lora', Georgia, serif",
  fontSize: '26px',
  fontWeight: 600,
  color: 'hsl(220, 20%, 20%)',
  margin: '0 0 20px',
}
const text = {
  fontSize: '15px',
  color: 'hsl(220, 20%, 25%)',
  lineHeight: '1.6',
  margin: '0 0 18px',
}
const card = {
  backgroundColor: 'hsl(36, 40%, 95%)',
  borderRadius: '12px',
  padding: '16px 18px',
  margin: '20px 0',
}
const cardText = {
  fontSize: '14px',
  color: 'hsl(220, 20%, 25%)',
  lineHeight: '1.5',
  margin: 0,
}
const signoff = {
  fontSize: '15px',
  color: 'hsl(220, 20%, 25%)',
  lineHeight: '1.6',
  margin: '28px 0 0',
}
