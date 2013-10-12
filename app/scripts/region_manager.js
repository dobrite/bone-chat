(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'scripts/communicator'
    ],
    function (Backbone, Communicator) {

        var RegionManager = Backbone.Marionette.Controller.extend({

            initialize: function (options) {
                console.log("Initialize a Region Manager");

                /* internal region manager */
                this._regionManager = new Backbone.Marionette.RegionManager();

                /* event API */
                Communicator.reqres.setHandler("rm:addRegion", this.addRegion, this);
                Communicator.reqres.setHandler("rm:removeRegion", this.removeRegion, this);
                Communicator.reqres.setHandler("rm:getRegion", this.getRegion, this);
            },

            /* add region facade */
            addRegion: function (regionName, regionId) {
                var region = this.getRegion(regionName);

                if(region) {
                    console.log("REGION ALREADY CREATED TO JUST RETURN REF");
                    return region;
                }

                return this._regionManager.addRegion(regionName, regionId);
            },

            /* convenience function */
            addRegions: function (regions) {
                this._regionManager.addRegions(regions);
            },

            /* remove region facade */
            removeRegion: function (regionName) {
                this._regionManager.removeRegion(regionName);
            },

            /* get region facade */
            getRegion: function (regionName) {
                return this._regionManager.get(regionName);
            }
        });

        return new RegionManager();

    });
}).call(this);