/**
 * Session model
 */
class Session {

  constructor(data = {}) {
    this.sessionId = null;
    this.title = null;
    this.image = null;
    this.maxParticipants = null;
    this.status = null;
    this.host = null;
    Object.assign(this, data);
  }
}
export default Session;
