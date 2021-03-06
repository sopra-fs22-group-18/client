/**
 * ActiveSession model
 */
class Session {

  constructor(data = {}) {
    this.sessionId = null;
    this.title = null;
    this.image = null;
    this.imageUrl = null;
    this.maxParticipants = null;
    this.sessionStatus = null;
    this.host = null;
    this.hostUsername = null;
    this.identifier = null;
    Object.assign(this, data);
    this.maxUsers = (this.maxParticipants + 1)
  }
}
export default Session;
