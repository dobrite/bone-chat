define([
    "backbone",
    "scripts/communicator",
    "scripts/entities/collection/channel_collection",
    "scripts/chat/common/channel/channel_collection_view",
],
function (Backbone, communicator, ChannelCollection, ChannelCollectionView) {

    var ChannelController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
            this.region = options.region;

            var channelCollection = new ChannelCollection();

            this.channelCollectionView = new ChannelCollectionView({
                collection: channelCollection
            });

            communicator.vent.on("chat:create:room", function (room) {
                channelCollection.add({channel: room});
            }, this);

            communicator.vent.on("chat:destroy:room", function (room) {
                var removed = channelCollection.findWhere({channel: room});
                channelCollection.remove(removed);
            }, this);

            this.listenTo(
                this.channelCollectionView,
                'itemview:change',
                function (event, view) {
                    communicator.command.execute(
                        'chat:show:room',
                        view.model.get('channel')
                    );
                }
            );

            this.listenTo(
                this.channelCollectionView,
                'itemview:remove',
                function (event, view) {
                    communicator.command.execute(
                        'chat:destroy:room',
                        view.model.get('channel')
                    );
                }
            );
        },

        showChannels: function () {
            this.region.show(this.channelCollectionView);
        },

        onClose: function () {
        },

    });

    return ChannelController;
});
