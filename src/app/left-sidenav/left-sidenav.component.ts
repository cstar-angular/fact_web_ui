import { Component, OnInit } from '@angular/core';

// keywords todo
import { TodoComponent } from '../todo/todo.component';
import { TodoDataService } from '../todo/todo-data.service'
import { Router } from '@angular/router';
import { KeysPipe } from '../core/keys-pipe.pipe';
import { TokenStorage } from '../core/token.storage';
import { AuthService } from '../core/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-left-sidenav',
  templateUrl: './left-sidenav.component.html',
  styleUrls: ['./left-sidenav.component.css']
})
export class LeftSidenavComponent implements OnInit {
    user_categories : Array<any>;
    categories : Array<any>;
    selected_categories : Array<any> = [];
    q : any;
  ngOnInit() {

      this.authService.attemptUserCategory().subscribe(
        data => {
            this.user_categories = data.user_categories;
            for(var i = 0;i < this.user_categories.length;i++){
                this.selected_categories.push(this.user_categories[i].category_id);
            }
        },
        error => {
            this.router.navigate(['']);
            this._flashMessagesService.show('Something went wrong !', { cssClass: 'alert-error', timeout: 5000 });
        }
      );
      this.authService.attemptCategory().subscribe(
        data => {
            this.categories = data.data;
            for(var i = 0;i < this.categories.length;i++){
                if(this.selected_categories.indexOf(this.categories[i]['id']) >= 0){
                    this.categories[i]['selected'] = true;
                }else{
                    this.categories[i]['selected'] = false;
                }
            }
            console.log(this.categories);
        },
        error => {
            this.router.navigate(['']);
            this._flashMessagesService.show('Something went wrong !', { cssClass: 'alert-error', timeout: 5000 });
        }
      );


  }

  newTodo: TodoComponent = new TodoComponent();

  constructor(
  	private router: Router, private token: TokenStorage,private authService: AuthService,private todoDataService: TodoDataService,private _flashMessagesService: FlashMessagesService
  	) {
  }

  // add keywords
  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new TodoComponent();
  }

  // toggle keyword
  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  //remove keyword
  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  // get keyword
  get todos() {
    return this.todoDataService.getAllTodos();
  }

  search(keyword = '') {}
  

}
