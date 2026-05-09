/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as contactConfirmation } from './contact-confirmation.tsx'
import { template as contactNotification } from './contact-notification.tsx'
import { template as applicationConfirmation } from './application-confirmation.tsx'
import { template as applicationNotification } from './application-notification.tsx'
import { template as appointmentRequestConfirmation } from './appointment-request-confirmation.tsx'
import { template as appointmentRequestNotification } from './appointment-request-notification.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-confirmation': contactConfirmation,
  'contact-notification': contactNotification,
  'application-confirmation': applicationConfirmation,
  'application-notification': applicationNotification,
  'appointment-request-confirmation': appointmentRequestConfirmation,
  'appointment-request-notification': appointmentRequestNotification,
}
