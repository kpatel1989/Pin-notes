define(function(require){
    var JoinGroupTemplate = require("text!/templates/join-group-dialog.html");
    var Group = require("models/group-association");
    
    var JoinGroupDialog = Backbone.View.extend({
        model : null,
        initialize: function(){
            this.model = new Group();
            this.listenTo(this.model,"change",this.onModelChange);
            this.render();
        },
        render: function(){
            this.$el.html(JoinGroupTemplate);
        },
        events: {
            "click #close" : "hide",
            "click #join" : "saveNote"
        },
        saveNote : function(){
            this.model.set({
                "name" : this.$("#name").val(),
                "userId" : window.userData.id
            });
            this.model.save(null,{
                validate : false,
                success:this.onSuccessfullSave.bind(this)
            });
        },
        onSuccessfullSave: function(object, response){
            if (response.id){
                this.hide();
                this.trigger("GROUP_ADDED",object.attributes);
            }
        },
        set: function(note){
            this.model.set(note);
        },
        onModelChange : function(){
            this.$("#name").val(this.model.get("name"));
        },
        show: function() {
            this.$el.fadeIn();
        },
        hide: function(){
            this.$el.fadeOut();
        }
    });
    return JoinGroupDialog;
})