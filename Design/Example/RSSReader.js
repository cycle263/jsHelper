/*  DisplayModule interface  */
var DisplayModule = new Interface('DisplayModule', ['append', 'remove', 'clear']);

/*  ListDisplay class  */
var ListDisplay = function(id, parent){  //implements DisplayModule
    this.list = document.createElement('ul'); 
    this.list.id = id;
    parent.appendChild(this.list);
}
