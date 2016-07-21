/**
 * Created by Timo on 19.07.2016.
 */
define(["backbone", "jquery", "underscore"], function(Backbone, $, _){
    var StatusView = Backbone.View.extend({
        tagname: 'section',
        template: _.template($('#status-template').text()),
        render: function () {
            if (this.model.attributes.status == 'online') {
                this.model.attributes.status = 'ONLINE';
                this.model.attributes.glyphicon = 'glyphicon-ok';
                this.model.attributes.alert = 'alert-success';
            } else if (this.model.attributes.status == 'unstable') {
                this.model.attributes.status = 'UNSTABLE';
                this.model.attributes.glyphicon = 'glyphicon-exclamation-sign';
                this.model.attributes.alert = 'alert-warning';
            } else if (this.model.attributes.status == 'offline') {
                this.model.attributes.status = 'OFFLINE';
                this.model.attributes.glyphicon = 'glyphicon glyphicon-remove';
                this.model.attributes.alert = 'alert-danger';
            }
            this.$el.html(this.template(this.model.attributes));
            $('#status').html(this.el);
            this.delegateEvents();
        },
        initialize: function() {
            var that = this;
            // Listeners
            this.model.on('change', this.render, this);

            // Start fetch timer
            this.fetchData();
        },
        events: {
            'click #btn-reload': 'reloadStatus'
        },
        reloadStatus: function () {
            this.fetchData();
        },
        fetchData: function() {
            clearTimeout(this.timeout);
            this.model.fetch({
                success: function(model, response) {
                    console.log(response);
                    this.timeout = setTimeout(this.fetchData, 60000);
                },
                error: function(model, response) {
                    this.timeout = setTimeout(this.fetchData, 60000);
                }
            });
        }
    });
    return StatusView;
});