export class LoggerLoggedEvent {
  text: string;
  payload: unknown;

  constructor(text: string, payload: unknown) {
    this.text = text;
    this.payload = payload;
  }
}
