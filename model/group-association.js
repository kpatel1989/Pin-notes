var DbConn = require("./db_conn"),
    _ = require("underscore"),
    Group = require(__dirname+"/group");

GroupAssociation = DbConn.extend({
    tableName : "group_association"
});

GroupAssociation.prototype.fetchAllRequests = function(userId,callback){
    var groups = new Group();
    var self = this;
    groups.fetchWhere({"where" : "adminId="+userId},function(result){
        var ids = _.pluck(result,"id").toString();
        var query = "SELECT ga.id,u.id as userId,u.emailId,g.name as 'groupName' ,g.id as 'groupId'"
            + "FROM group_association ga join user u "
            + "on ga.userId = u.id "
            + "join groups g on ga.groupId = g.id "
            + "WHERE groupId in ("+ ids +")  and approved = 0";
        console.log(query);
        self.query(query,function(err,result){
            callback(result);
        });
    });
}
GroupAssociation.prototype.saveJoinRequest = function(data,callback){
    var groups = new Groups();
    groups.fetchOne({
        "where" : "name ='" + data.name +"'"
    },(function(result){
        if (result){
            var associationData = {
                groupId : result.id,
                userId : data.userId
            };
            this.set(associationData);
            this.save(function(err,result){
                callback(err ? err : {id:result.insertId});
            });
        }
        else{
            callback({});
        }
    }).bind(this));

}

GroupAssociation.prototype.approveRequest = function(data,callback){
    this.set(data);
    this.save(function(err,result){
        callback(err ? err : {id:result.insertId});
    });
}
module.exports = GroupAssociation;