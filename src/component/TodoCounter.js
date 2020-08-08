import { pubsub } from '../lib/pubsub.js'
import TodoList from './TodoList.js'

const TodoCounter = {}

TodoCounter.rootEl = document.querySelector("#todo-counter")

TodoCounter.init = function(){
  this.render()
  pubsub.subscribe('todoUpdated', TodoCounter.render)
}

TodoCounter.render = function(){
  let template = ""
  let counter = TodoCounter.checkCounter(TodoList.list)
  let counterClass = counter >= 1 ? "class='highlight'" : ""

  template += `
    <div>완료 항목의 갯수는</div>
    <strong ${counterClass}>${counter}</strong>
    <div>개 입니다.</div>
  `
  
  TodoCounter.rootEl.innerHTML = template;
}

TodoCounter.checkCounter = function(list){
  return list.reduce((count, val) => {
    if(val.checked) count++
    return count
  }, 0)
}

export default TodoCounter;