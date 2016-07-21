/**
 * Created by Timo on 19.07.2016.
 */
define(["backbone" , "underscore"], function(Backbone, _){
    var result = {};
    var StatusSchema = {
        urlRoot: '/status',
        initialize: function () {

        },
        validate: function(attr){
            if(_.isEmpty(attr.status))
                return "Missing status";
            if(_.isEmpty(attr.latency))
                return "Missing latency";
        }
    };

    return Backbone.Model.extend(StatusSchema);
});