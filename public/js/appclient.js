/**
 * Created by Timo on 19.07.2016.
 */
requirejs.config({
    baseUrl: "/js",
    paths: {
        jquery: '//code.jquery.com/jquery-2.2.4.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});

// AMD conform require as provided by require.js
require(['jquery', 'backbone', 'bootstrap', 'models/status', 'views/status'],
        function($, Backbone, Bootstrap, StatusModel, StatusView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'main',
            '*whatever': 'main'
        },
        main: function(){
            var statusModel = new StatusModel();
            var statusView = new StatusView({model: statusModel});
        }
    });

    var myRouter = new AppRouter();

    // finally start tracking URLs to make it a SinglePageApp (not really needed at the moment)
    Backbone.history.start({pushState: true}); // use new fancy URL Route mapping without #
});
