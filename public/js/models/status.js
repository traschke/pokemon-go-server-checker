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

    var StatusModel = Backbone.Model.extend(StatusSchema);

    var StatusCollection = Backbone.Collection.extend({
        model: StatusModel,
        url: "/status",
        initialize: function () {
            this.on("add", function (video) {
                if(video.isValid() && video.isNew()) {
                    video.save();
                }
            })
        }
    });

    result.Model = StatusModel;
    result.Collection = StatusCollection;
    return result;
});