import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/Notas/note';

describe('Note - tests', () => {
  let note: Note;

  beforeEach(() => {
    note = new Note('user', 'title', 'body', 'color');
  });

  it('should create a new note', () => {
    expect(note).to.be.an.instanceof(Note);
  });

  it('should return the user', () => {
    expect(note.getUser()).to.be.equal('user');
  });

  it('should return the title', () => {
    expect(note.getTitle()).to.be.equal('title');
  });

  it('should return the body', () => {
    expect(note.getBody()).to.be.equal('body');
  });

  it('should return the color', () => {
    expect(note.getColor()).to.be.equal('color');
  });
});
