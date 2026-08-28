const CATEGORIES = ['basicProfile', 'preferencesAndDailyLife', 'peopleAndRelationships', 'ongoingStories', 'serviceUnderstanding', 'impressionsAndHypotheses'];

export class SessionMemory {
  #messages = [];
  customerUnderstanding = Object.fromEntries(CATEGORIES.map((category) => [category, []]));
  dailySummary = null;
  longTermMemory = null;

  add(role, content) {
    const message = { role, content: content.trim(), at: new Date().toISOString() };
    this.#messages.push(message);
    return message;
  }

  conversation() {
    const firstUser = this.#messages.findIndex(({ role }) => role === 'user');
    return this.#messages.slice(Math.max(0, firstUser)).map(({ role, content }) => ({ role, content }));
  }
  history() { return this.#messages.map((message) => ({ ...message })); }
  get lastExchange() { return this.#messages.slice(-2); }
}
