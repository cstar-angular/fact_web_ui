import {TodoComponent} from './todo.component';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new TodoComponent()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let todo = new TodoComponent({
      title: 'hello',
      complete: true
    });
    expect(todo.title).toEqual('hello');
    expect(todo.complete).toEqual(true);
  });
});