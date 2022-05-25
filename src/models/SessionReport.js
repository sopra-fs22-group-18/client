/**
 * ActiveSession model
 */
class SessionReport {

  constructor(data = {}) {
    this.reportId = null;
    this.session = null;
    this.user = null;
    this.description = null;
    this.reason = null;
    this.createdDate = null;
    Object.assign(this, data);
  }
}
export default SessionReport;
