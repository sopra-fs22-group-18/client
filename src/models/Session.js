/**
 * ActiveSession model
 */
class Session {

  constructor(data = {}) {
    this.sessionId = null;
    this.title = null;
    this.image = null;
    this.maxParticipants = null;
    this.sessionStatus = null;
    this.host = null;
    this.hostUsername = null;
    Object.assign(this, data);
    this.maxUsers = (this.maxParticipants + 1)
  }
}
export default Session;
