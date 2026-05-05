/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Heartland Mental Health Services'

interface ContactConfirmationProps {
  name?: string
}

const ContactConfirmationEmail = ({ name }: ContactConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We received your message — thank you for reaching out</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Thank you, ${name}` : 'Thank you for reaching out'}
        </Heading>
        <Text style={text}>
          We received your message and a member of our care team will get back
          to you as soon as possible — typically within one business day.
        </Text>
        <Section style={card}>
          <Text style={cardText}>
            If your matter is urgent or you are experiencing a mental health
            emergency, please call or text <strong>988</strong> (Suicide &amp;
            Crisis Lifeline) or dial <strong>911</strong>.
          </Text>
        </Section>
        <Text style={text}>
          We appreciate you trusting us with your care.
        </Text>
        <Text style={signoff}>Warmly,<br />The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'We received your message — Heartland Mental Health Services',
  displayName: 'Contact form confirmation (to client)',
  previewData: { name: 'Jane' },
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
