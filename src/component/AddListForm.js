import { pubsub } from '../lib/pubsub.js'

let AddListForm = {}

AddListForm.render = function(){
  const root = document.querySelector('#app')

  root.insertAdjacentHTML('beforebegin', this.componentHTML())
  this.addEvent()
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

AddListForm.addEvent = function(){
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
  
  let title = val
  val = ""
  console.log(title)

  pubsub.publish('todoAdded', title)

}

export default AddListForm