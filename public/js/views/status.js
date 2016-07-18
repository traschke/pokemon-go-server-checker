/**
 * Created by Timo on 19.07.2016.
 */
define(["backbone", "jquery", "underscore"], function(Backbone, $,  _){
    var StatusView = Backbone.View.extend({
        tagname: 'section',
        template: _.template($('#status-template').text()),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        initialize: function() {
            
        }
    });
    return StatusView;
});