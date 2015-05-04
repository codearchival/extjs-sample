Ext.define('ArtistCollection.controller.Artist', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            '#searchForm button[action=search]': {
                'click': this.searchArtist
            }
        });
    },

    searchArtist: function(button) {
        var searchText = Ext.ComponentQuery.query('#searchText')[0].value;
   		var store = Ext.getStore('Artist');
       	var params = Ext.apply(store.proxy.extraParams, { 'artist': searchText });       
		store.load(params)
    }
});