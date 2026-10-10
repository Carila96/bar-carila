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
    const turns = [];
    for (const { role, content } of this.#messages.slice(Math.max(0, firstUser))) {
      if (turns.at(-1)?.role === role) turns.at(-1).content = `${turns.at(-1).content}\n${content}`.slice(-4000);
      else turns.push({ role, content: content.slice(-4000) });
    }
    const recent = turns.slice(-39);
    if (recent[0]?.role === 'assistant') recent.shift();
    return recent;
  }
  history() { return this.#messages.map((message) => ({ ...message })); }
  get lastExchange() { return this.#messages.slice(-2); }
}
