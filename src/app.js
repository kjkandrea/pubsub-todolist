import AddListForm from './component/AddListForm.js'
import TodoList from './component/TodoList.js'
import TodoCounter from './component/TodoCounter.js'

window.addEventListener('DOMContentLoaded', function(){
  TodoList.init()
  AddListForm.init()
  TodoCounter.init()
})