import axios from 'axios';
import { Alert } from '../types';

const NWS_ALERTS_API = 'https://api.weather.gov/alerts/active';

interface NWSAlertFeature {
  id: string;
  properties: {
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
    senderName: string;
    areaDesc: string;
    status: string;
    messageType: string;
    category: string;
    response: string;
  };
}

interface NWSAlertsResponse {
  features: NWSAlertFeature[];
}

export async function fetchAlerts(lat: number, lon: number): Promise<Alert[]> {
  try {
    const response = await axios.get<NWSAlertsResponse>(NWS_ALERTS_API, {
      params: {
        point: `${lat.toFixed(4)},${lon.toFixed(4)}`,
        status: 'actual',
        message_type: 'alert,update',
      },
      headers: {
        'User-Agent': 'SmartWeather React App',
      },
    });

    if (!response.data || !response.data.features) {
      return [];
    }

    return response.data.features
      .filter((feature) => {
        // Filter out expired alerts
        const expires = new Date(feature.properties.expires);
        return expires > new Date();
      })
      .map((feature) => {
        const props = feature.properties;
        return {
          id: props.id,
          event: props.event,
          headline: props.headline || props.event,
          description: props.description || '',
          instruction: props.instruction || null,
          severity: props.severity || 'Unknown',
          urgency: props.urgency || 'Unknown',
          certainty: props.certainty || 'Unknown',
          onset: props.onset,
          expires: props.expires,
          sender: props.senderName || 'National Weather Service',
          areaDesc: props.areaDesc || '',
          status: props.status || 'Unknown',
          messageType: props.messageType || 'Alert',
          category: props.category || 'Met',
          response: props.response || 'Monitor',
        };
      });
  } catch (error) {
    console.error('Fetch alerts failed:', error);
    return [];
  }
}

export async function fetchAlertById(alertId: string): Promise<Alert | null> {
  try {
    const response = await axios.get(`https://api.weather.gov/alerts/${alertId}`, {
      headers: {
        'User-Agent': 'SmartWeather React App',
      },
    });

    if (!response.data || !response.data.properties) {
      return null;
    }

    const props = response.data.properties;
    return {
      id: props.id,
      event: props.event,
      headline: props.headline || props.event,
      description: props.description || '',
      instruction: props.instruction || null,
      severity: props.severity || 'Unknown',
      urgency: props.urgency || 'Unknown',
      certainty: props.certainty || 'Unknown',
      onset: props.onset,
      expires: props.expires,
      sender: props.senderName || 'National Weather Service',
      areaDesc: props.areaDesc || '',
      status: props.status || 'Unknown',
      messageType: props.messageType || 'Alert',
      category: props.category || 'Met',
      response: props.response || 'Monitor',
    };
  } catch (error) {
    console.error('Fetch alert by ID failed:', error);
    return null;
  }
}
