(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'controllers/websocketProxy',
        'regionManager',
        'communicator',
        'hbs!tmpl/main',
    ],
    function (Backbone, WebsocketProxy, RegionManager, Communicator, MainTemplate) {
        console.log("application.js");

        var mainTemplate = MainTemplate;

        var App = new Backbone.Marionette.Application();

        /* Add application regions here */
        RegionManager.addRegions({
            mainPane: "#main",
        });

        /* Add initializers here */
        App.addInitializer(function () {
            document.body.innerHTML = mainTemplate();
            Communicator.vent.trigger("app:start");
            //var message = new Message({nick: 'Nick', text: 'Yo!'});
            //var messages = new MessagesCollectionView();

            //var messageItemView = new MessageItemView({model: message});

            //RegionManager.getRegion('mainPane').show(messageItemView);
        });

        App.on("initialize:after", function () {
            console.log("initialize:after");
        });

        return App;
    });
}).call( this );
