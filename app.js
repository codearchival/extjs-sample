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