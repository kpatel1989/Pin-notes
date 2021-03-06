define(function(require){
   
    var note = Backbone.Model.extend({
       
        urlRoot : "/note",
        
        initialize: function(){
            
        },
        validate : function(){
            if (!this.get("title") || this.get("title") == ""){
                return false;
            }
            if (!this.get("description") || this.get("description") == ""){
                return false;
            }
            return true;
        },
        saveNote: function () {
            this.save(null,{
                url : this.urlRoot + "/save",
                validate : false,
                success:this.onSuccessfulSave.bind(this)
            });
        },
        deleteNote : function () {
            this.destroy({
                url: this.urlRoot + "/delete/"+this.attributes.id,
                success: (function () {
                    this.trigger("MODEL_DELETED", this.attributes);
                }).bind(this)
            });
        },
        onSuccessfulSave: function(object, response){
            this.trigger("MODEL_SAVED",this.attributes);
        }
    });
    return note;
});