# Example of using ExtJS to Access External API

This app consists of the followng files and directories:

- index.html - the main html file for displaying the application
- app.js - the main ExtJS application file
  -  app folder which contains all of the files required by the application
     -  controller  - contains the controller for the application
     -  model - contains the model for the application
     -  view - contains the main view (search results grid) for the application
     -  store - contains the store which is responsible for retrieving the data from the API


----------


This is an example of using ExjJS to search the [http://www.last.fm/api](http://www.last.fm/api "www.last.fm/api")  The example contains a search box to enter the name or partial name of a band and when clicking search, the results are displayed in the grid below.

You can view a Sencha Fiddle preview here [Sencha Fiddle Preview](https://fiddle.sencha.com/fiddle/m95/preview "Sencha Fiddle Preview")


----------

Here is a screen shot of the application:


![Screen Shot](https://github.com/bizcasfri/extjs-sample/blob/master/readmeimages/screenshot.png)



----------


The application is very simple in structure, there is an app.js file, which sets up the application and it's viewport. The view port is simple just one grid and a form.

    Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.panel.*', 'Ext.layout.container.Border']);

    Ext.application({
	    name: 'ArtistCollection',
	
	    controllers: ['Artist'],
	    stores: ['Artist'],
	    views: ['Artist'],
	
	    launch: function() {
	        ArtistCollection.app = this;
	
	        Ext.create('Ext.container.Viewport', {
	            layout: 'border',
	            padding: 10,
	            items: [{
	                region: 'north',
	                xtype: 'component',
	                padding: 10,
	                height: 40,
	                html: 'ROCKIN ARTISTS'
	            }, {
	                region: 'center',
	                autoScroll: true,
	                flex: 1,
	                xtype: 'panel',
	                title: 'Artists',
	                items: [{
	                    xtype: 'container',
	                    padding: 10,
	                    items: [{
	                        xtype: 'form',
	                        itemId: 'searchForm',
	                        items: [{
	                            xtype: 'textfield',
	                            itemId: 'searchText'
	                        }, {
	                            xtype: 'button',
	                            itemId: 'searchButton',
	                            text: 'Search',
	                            action: 'search'
	                        }]
	                    }]
	                }, {
	                    xtype: 'artistgrid'
	                }]
	            }]
	        });
	    }
    });

The view is just a grid panel. Two of the columns are template columns to display images and hyperlinks.

    Ext.define('ArtistCollection.view.Artist', {
	    extend: 'Ext.grid.Panel',
	    itemId: 'artistGrid',
	    alias: 'widget.artistgrid',
	    store: 'Artist',
	    columns: [{
	        text: "Artist",
	        flex: 1,
	        dataIndex: 'name',
	        sortable: true
	    }, {
	        text: 'Artist URL',
	        xtype: 'templatecolumn',
	        flex: 2,
	        tpl: '<a href="{url}" target="_blank">{url}</a>',
	        dataIndex: 'url'
	    }, {
	        text: "Artist Image",
	        xtype: 'templatecolumn',
	        dataIndex: 'image',
	        tpl: '<img style="height: 64px;" src="{image}"/>',
	        width: 175,
	        sortable: false
	    }, {
	        text: "Total Listeners ",
	        dataIndex: 'listeners',
	        sortable: true,
	        width: 100,
	    }]

    });


The model represents just a small portion of the data being returned from the API in order to keep this example as simple as possible.  You will notice that there is a convert method on the image property so we can get a specific size image for display since it returns several different size images.

    Ext.define('ArtistCollection.model.Artist', {
	    extend: 'Ext.data.Model',
	    idProperty: 'trackId',
	    fields: [{
	        name: 'name',
	        type: 'string'
	    }, {
	        name: 'listeners',
	        type: 'int'
	    }, {
	        name: 'url',
	        type: 'string'
	    }, {
	        name: 'image',
	        type: 'auto',
	        convert: function(v, rec) {
	            if (v.length > 1) {
	                return v[1]['#text'];
	            } else {
	                return '';
	            }
	        }
	    }]
    });

The controller is responsible for handling the click of the search button, adding the extra parameters to the store and then loading the store which is bound to the grid.


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
	   		var store = Ext.getStore('Artist');`
	       	var params = Ext.apply(store.proxy.extraParams, { 'artist': searchText });       
			store.load(params)
	    }
    });

The store is responsible for actually retrieving the data from the API with specified parameters.  You can see that we have also defined a root property in the reader so we know where to start reading the JSON data in the returned results.  We have also defined extra parameters required by the API call.

    Ext.define('ArtistCollection.store.Artist', {
	    extend: 'Ext.data.Store',
	    model: 'ArtistCollection.model.Artist',
	    storeId: 'Artist',
	    proxy: {
	        extraParams: {
	            method: 'artist.search',
	            api_key: 'db0982a4afd1270e59691c4caa0e5dba',
	            format: 'json'
	        },
	        type: 'ajax',
	        url: 'https://ws.audioscrobbler.com/2.0/',
	        reader: {
	            rootProperty: 'results.artistmatches.artist'
	        }
	    }
    });