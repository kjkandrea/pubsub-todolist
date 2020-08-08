import { pubsub } from '../lib/pubsub.js'
import GetDateFormat from '../plugins/GetDateFormat.js'

let AddListForm = {}

AddListForm.init = function(){
  this.render()
  this.bindEvent()
}

AddListForm.render = function(){
  const root = document.querySelector('#form')

  root.innerHTML = this.componentHTML()
}

AddListForm.componentHTML = function(){
  let template = `
    <form id="todolist-form">
      <input type="text" placeholder="something..." />
      <input type="submit" />
    </form>
  `
  return template;
}

AddListForm.bindEvent = function(){
  const form = document.querySelector('#todolist-form')
  form.addEventListener('submit', el => this.formValidate(el))
}

AddListForm.formValidate = function(el){
  el.preventDefault()
  
  let val = el.target.querySelector('input').value
  
  if (!val.trim()) {
    alert('값을 입력해주세요.') 
    return
  }
  
  let article = val
  val = ""

  pubsub.publish('todoAdded', { date: GetDateFormat(), article: article })

}

export default AddListForm