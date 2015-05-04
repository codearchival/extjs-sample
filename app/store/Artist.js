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