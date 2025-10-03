export enum UserRole {
  PATIENT = 'patient',
  THERAPIST = 'therapist'
}

export interface User {
  id: string;
  email: string;
  password?: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: UserRole.PATIENT;
}

export interface Therapist extends User {
  role: UserRole.THERAPIST;
  specialization: string[];
  education: string;
  bio: string;
  yearsOfExperience: number;
  hourlyRate: number;
  availability: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  id: string;
  therapistId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isAvailable: boolean;
}
