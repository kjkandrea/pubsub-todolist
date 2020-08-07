import AddListForm from './component/AddListForm.js'
import TodoList from './component/TodoList.js'

window.addEventListener('DOMContentLoaded', function(){
  TodoList.init()
  AddListForm.render()
})