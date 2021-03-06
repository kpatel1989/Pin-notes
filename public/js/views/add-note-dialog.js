define(function(require){
    var AddNoteTemplate = require("text!/templates/add-note-dialog.html");
    var Notes = require("models/note");

    var AddNoteDialog = Backbone.View.extend({
        model : null,
        initialize: function(){
            this.model = new Notes();
            this.listenTo(this.model,"change",this.onModelChange);
            this.listenTo(this.model,"MODEL_SAVED",this.onSuccessfulSave);
            this.render();
            this.groupId = null;
            this.undelegateEvents();
        },
        render: function(){
            this.$el.html(AddNoteTemplate);
        },
        events: {
            "click #close" : "hide",
            "click #saveNote" : "saveNote"
        },
        saveNote : function(){
            this.model.set({
                "title" : this.$("#title").val(),
                "description" : this.$("#description").val(),
                "userId" : window.userData.id,
                "groupId" : this.groupId
            });
            this.model.saveNote();
        },
        onSuccessfulSave: function(response){
            if (response.id){
                this.hide();
                this.trigger("NOTE_ADDED",this.model.attributes);
            }
        },
        set: function(note){
            this.model.clear();
            this.model.set(note);
        },
        setGroupId: function(groupId){
            this.groupId = groupId;
        },
        onModelChange : function(){
            this.$("#title").val(this.model.get("title"));
            this.$("#description").val(this.model.get("description"));
        },
        show: function() {
            this.render();
            $('#add-note-modal').modal('show');
            this.delegateEvents();
        },
        hide: function(){
            $('#add-note-modal').modal('hide');
            this.$("#title").val('');
            this.$("#description").val('');
            this.undelegateEvents();
        }
    });
    return AddNoteDialog;
})