
export interface WebhookPayload {
  order_id?: string;
  order_reference_id?: string;
  order_number?: string;
  event_type?: string;
  data: object;
}
