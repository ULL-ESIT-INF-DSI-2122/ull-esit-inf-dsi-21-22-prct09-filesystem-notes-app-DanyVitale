/**
 * Note Class - represents a note
 */
export class Note {
  /**
   * Constructor - creates a new note
   * @param user - the user
   * @param title - the title
   * @param body - the body
   * @param color - the color
   */
  constructor(private readonly user: string, private title: string, private body: string, private color: string) {}

  /**
   * GETTER: getUser - returns the user
   * @returns {string} - returns the note as a string
   */
  getUser() {
    return this.user;
  }

  /**
   * GETTER: getTitle - returns the title
   * @returns {string} - returns the note as a string
   */
  getTitle() {
    return this.title;
  }

  /**
   * GETTER: getBody - returns the body
   * @returns {string} - returns the note as a string
   */
  getBody() {
    return this.body;
  }

  /**
   * GETTER: getColor - returns the color
   * @returns {string} - returns the note as a string
   */
  getColor() {
    return this.color;
  }
}
