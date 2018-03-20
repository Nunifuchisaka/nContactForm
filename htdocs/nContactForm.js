;(function($, window, document, undefined){
"use strict";

window.nContactForm = new Object();


nContactForm.Model = Backbone.View.extend({
  
  defaults: function(){
    return {
      value: ""
    }
  }
  
});


nContactForm.View = Backbone.View.extend({
  
  initialize: function(opts){
    var self = this;
    _.bindAll(this, "change", "confirm", "render", "get_val");
    this.opts = _.extend({
      
    }, opts);
    
    this.$all = this.$(".ncf_1__input, .ncf_1__radio, .ncf_1__checkbox, .ncf_1__select");
    this.$input = this.$(".ncf_1__input");
    this.$radio = this.$(".ncf_1__radio");
    this.$checkbox = this.$(".ncf_1__checkbox");
    this.$select = this.$(".ncf_1__select");
    this.$1 = this.$(".ncf_1__1");
    
    this.$all.on("change", this.change);
    
    this.$confirm = this.$(".ncf_1__confirm");
    console.log( this.$confirm.length );
    this.$confirm.on("click", "button", this.confirm);
    
    this.$submit = this.$(".ncf_1__submit");
  },
  
  change: function(e){
    console.log("change");
    var $input = $(e.currentTarget),
        name = $input.attr("name"),
        type = $input.attr("type"),
        val = this.get_val($input);
    
    name = name.replace("[]", "");
    if( this.opts.callback.change[name] ){
      this.opts.callback.change[name]( val );
    }
  },
  
  confirm: function(){
    console.log("confirm");
    this.$1.each(this.render);
  },
  
  render: function(i,el){
    var $me = $(el),
        $input = $me.find("input, select, textarea"),
        name = $input.attr("name"),
        type = $input.attr("type"),
        $parent = $me.parent(),
        val = this.get_val($input);
    
    this.$confirm.css("display", "none");
    this.$submit.css("display", "block");
    
    $me.css("display", "none");
    $parent.prepend(val);
    
    name = name.replace("[]", "");
    if( this.opts.callback.confirm[name] ){
      this.opts.callback.confirm[name]( val );
    }
  },
  
  get_val: function($input){
    var name = $input.attr("name"),
        type = $input.attr("type"),
        val = "";
    
    switch(type){
      case "radio":
        val = $input.filter(":checked").val();
        break;
      case "checkbox":
        val = this.$(".ncf_1__checkbox[name='" + name + "']:checked").map(function(){
          return $(this).val();
        }).get();
        break;
      default:
        val = $input.val();
        break;
    }
    
    return val;
  }
  
});


nContactForm.match = function(ary, val){
  var match = false;
  for ( var i = 0; i < ary.length; i++ ) {
    if ( val == ary[i] ) {
      match = true;
      break;
    }
  }
  return match;
}


})(jQuery, this, this.document);