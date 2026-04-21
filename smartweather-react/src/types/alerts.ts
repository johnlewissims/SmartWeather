export interface Alert {
  id: string;
  event: string;
  headline: string;
  description: string;
  instruction: string | null;
  severity: string;
  urgency: string;
  certainty: string;
  onset: string;
  expires: string;
  sender: string;
  areaDesc: string;
  status: string;
  messageType: string;
  category: string;
  response: string;
}
