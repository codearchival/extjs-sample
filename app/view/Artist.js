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