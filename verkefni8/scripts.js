const ENTER_KEYCODE = 13;

// h1       class="heading"
// ul       class="items"
// ul.li       class="item item--done"
// ul.li.input    class="item__checkbox"
// ul.li.span     class="item__text"
// ul.li.button   class="item__button"
// form     class="form"
// form.input     class="form__input"
// form.button    class="form__button"


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  
  function init(_form, _items) {
    items = _items;

    // Þegar ýtt er á sumbit (sem er inní form) þá mun keyra fallið formHandler
    _form.addEventListener('submit', formHandler);

    _items.addEventListener('change',finish);

    var span__change = document.getElementsByClassName('item__text');
    for(let i=0; i<span__change.length; i++){
      span__change[i].onclick =edit;
    }

    var button__delete = document.getElementsByClassName('item__button');
    for(let i=0; i<b_delet.length;i++){
      button__delete[i].onclick = deleteItem;
    }

    // for (let item of items){
    //   const item__text     = item.querySelector('.item__text');
    //   const item__checkbox = item.querySelector('.item__checkbox');
    //   const item__button   = item.querySelector('.item__button');

    //   item__text.addEventListener('click',edit);
    //   item__checkbox.addEventListener('click',finish);
    //   item__button.addEventListener('click',deleteItem);
    // }
    
    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();

    const input = document.getElementsByClassName('form__input');

    if(input.value.trim().lenght>0){
      add(input.value);
      input.value='';
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.preventDefault();

    var checkbox = document.getElementsByClassName("item__checkbox");
    
    for(let i=0; i<checkbox.length;i++){
      if(checkboxes[i].checked === true){
        checkboxes[i].parentElement.className="item item--done";
      }
      else if(checkboxes[i].checked === true){
        checkboxes[i].parentElement.className="item";
      }
    }
  }

  // event handler fyrir það að breyta færslu
  // span.item__text
  function edit(e) {
    e.preventDefault();

    var input = document.createElement("input");//býr til nýtt element
    input.type = "text";
    input.value = this.innerHTML;
    input.className = "item__text";

    this.replaceWith(input); //this er span elementið sem ýtt var á
    input.focus(); //svo það sé hægt að byrja skrifa strax
    
    input.addEventListener("keydown",function(e){
      if(e.keyCode == 13){
        
        var event = new Event('submit');
        input.addEventListener('submit',commit);
        input.dispatchEvent(event);
        input.removeEventListener('submit',commit);
      }
    });
    
  }

  // event handler fyrir það að klára að breyta færslu
  // span.item__text
  function commit(e) {

    e.preventDefault();

    var span = document.createElement("span");
    span.className = "item__text";
    span.innerHTML = this.value;
    this.replaceWith(span);
    span.onclick = edit;
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const item = document.createElement('li');
    item.className = 'item';

    const text = document.createElement('span');
    text.className = 'item__text';
    text.addEventListener('click', edit); 
    text.innerHTML = value; 
    
    const checkbox = document.createElement('input');
    checkbox.className = 'item__checkbox';
    checkbox.addEventListener('click',finish);

    const button =   el('button','item__button',   deleteItem);
    button.className ='button';
    button.addEventListener('click',deleteItem);
    checkbox.type='checkbox';
    button.innerHTML='Eyða';
    
    item.appendChild(text);
    item.appendChild(checkbox);
    item.appendChild(button);

    items.appendChild(item);
    var span__change = document.getElementsByClassName('item__text');
    for(let i=0; i<span__change.length; i++){
      span__change[i].onclick =edit;
    }

    var button__delete = document.getElementsByClassName('item__button');
    for(let i=0; i<b_delet.length;i++){
      button__delete[i].onclick = deleteItem;
    }

  }

  // event handler til að eyða færslu
  // button.item__button
  function deleteItem(e) {
  }

  // hjálparfall til að útbúa element
  // function el(type, className, clickHandler) {
  //  
  // }

  return {
    init: init
  }
})();