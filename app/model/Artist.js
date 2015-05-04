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