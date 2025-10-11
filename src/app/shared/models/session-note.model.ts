export interface SessionNote {
  id: string;
  appointmentId: string;
  patientId: string;
  therapistId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}