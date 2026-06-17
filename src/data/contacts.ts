import type { IconType } from 'react-icons';
import {
  BiLogoGithub, BiLogoGmail, BiLogoWhatsapp, BiLogoFacebook,
} from 'react-icons/bi';

export interface ContactEntry {
  id: string;
  title: string;
  value: string;
  category: string;
}

export const CONTACTS: ContactEntry[] = [
  { id: 'con-001', title: 'GitHub',   value: 'https://github.com/aaronmfs',         category: 'GitHub' },
  { id: 'con-002', title: 'Gmail',    value: 'sinay.aaronmathew@gmail.com',          category: 'Gmail' },
  { id: 'con-003', title: 'WhatsApp', value: '+63-9193311850',                      category: 'WhatsApp' },
  { id: 'con-005', title: 'Facebook', value: 'https://facebook.com/aaron.mathew.sinay.2025', category: 'Facebook' },
];

export const CONTACT_ICONS: Record<string, IconType> = {
  'GitHub':   BiLogoGithub,
  'Gmail':    BiLogoGmail,
  'WhatsApp': BiLogoWhatsapp,
  'Facebook': BiLogoFacebook,
};

export const CONTACT_COLORS: Record<string, string> = {
  'GitHub': '#333333',
  'Gmail': '#EA4335',
  'WhatsApp': '#25D366',
  'Facebook': '#1877F2',
};
