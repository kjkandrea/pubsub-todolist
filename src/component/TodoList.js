import { pubsub } from '../lib/pubsub.js'
import getDateFormat from '../plugins/GetDateFormat.js'

let TodoList = {}

TodoList.list = [
  { date: '2020-08-07', article: '하나 추가했어요.'},
  { date: '2020-08-08',article: '추가된 두번째 리스트 입니다.'}
]

TodoList.rootEl = document.querySelector('#todo-items')

TodoList.init = function(){
  this.render(this.rootEl)
  this.bindEvent()
  pubsub.subscribe('todoAdded', TodoList.added)
}

TodoList.render = function(){
  let template = "";

  TodoList.list.forEach(item => {
    const highlighter = (item.date === getDateFormat()) ? "class='today'" : ""

    template += `
      <li ${highlighter}>
        <time datetime="${item.date}">${item.date}</time><span>${item.article}</span>
        <button data-bind="delete">x</button>
      </li>
    `
  });

  this.rootEl.innerHTML = template
}

TodoList.added = function(data){
  const list = [...TodoList.list, data]
  TodoList.list = list

  TodoList.render()
}

TodoList.bindEvent = function() {
  this.rootEl.addEventListener('click', el => {
    this.deleteItem(el)
  })
}

TodoList.deleteItem = function(el) {
  if(!el.target.dataset.bind) return;
  const val = el.target.parentElement.querySelector('span').innerText

  const newList = this.list.concat().filter(v => v !== val)  
  this.list = newList

  this.render()
}

export default TodoList