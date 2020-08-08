import { pubsub } from '../lib/pubsub.js'
import getDateFormat from '../plugins/GetDateFormat.js'

let TodoList = {}

TodoList.list = [
  { date: '2020-08-07', article: '하나 추가했어요.', checked: false },
  { date: '2020-08-08',article: '추가된 두번째 리스트 입니다.', checked: true}
]

TodoList.rootEl = document.querySelector('#todo-items')

TodoList.init = function(){
  this.render(this.rootEl)
  this.bindEvent()
  pubsub.subscribe('todoAdded', TodoList.added)
}

TodoList.render = function(){
  let template = "";

  TodoList.list.forEach((item, idx) => {
    const highlighter = (item.date === getDateFormat()) ? "today" : ""
    const checked = item.checked ? "checked" : ""
    const checkedClass = checked !== "" ? "class='checked'" : ""

    template += `
      <li ${checkedClass}>
        <div class="content">
          <input id="check-${idx}" data-index="${idx}" type="checkbox" ${checked} />
          <label for="check-${idx}">
            <time class="${highlighter}" datetime="${item.date}">${item.date}</time>
            ${item.article}
          </label>
          <button data-bindatc="${item.article}">&#10005;</button>
        </div>
      </li>
    `
  });

  this.rootEl.innerHTML = template
}

TodoList.added = function(data){
  const duplicate = TodoList.list.some(v => {
    if (v.article === data.article) return true
  })
  if (duplicate) {
    alert('같은 항목이 이미 있어요!')
    return
  }

  const list = [...TodoList.list, data]
  TodoList.list = list

  TodoList.render()
}

TodoList.bindEvent = function() {
  this.rootEl.addEventListener('click', el => {
    if(el.target.tagName === 'INPUT') this.checkDataToggle(el)
    if(el.target.tagName === 'BUTTON') this.deleteItem(el)
  })
}

TodoList.deleteItem = function(el) {
  if(!el.target.dataset.bindatc) return;
  const val = el.target.dataset.bindatc

  const newList = this.list.concat().filter(v => {
    return v.article !== val
  })  
  this.list = newList

  pubsub.publish('todoUpdated')

  this.render()
}

TodoList.checkDataToggle = function(el) {
  let newList = this.list.concat()
  newList[el.target.dataset.index].checked = el.target.checked
  this.list = newList

  pubsub.publish('todoUpdated')

  this.render()
}

export default TodoList