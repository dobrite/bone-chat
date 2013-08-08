(function() {
    'use strict';

    var root = this;

    root.define([
        'views/item/messageItemView',
        'models/message'
        ],
        function( MessageItemView, Message ) {

            describe('MessageItemView', function () {

                it('should be an instance of MessageItemView', function () {
                    var messageItemView = new MessageItemView();
                    expect( messageItemView ).to.be.an.instanceof( MessageItemView );
                });

                it('should have a tagName of "p"', function () {
                    var messageItemView = new MessageItemView();
                    expect( messageItemView.tagName ).to.be.equal("p");
                });

            });

        });

}).call( this );
