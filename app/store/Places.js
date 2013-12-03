Ext.define('Bim.store.Places', {
    extend: 'Ext.data.Store',
    model: 'Bim.model.Place',
//    filters: {
//        property: 'siteId',
//        value: -1
//    },    
    proxy: {
        type: 'rest',
        url : 'api/admin/places.json'
//        reader: {
//            root: 'results'
//        }
    },
    autoLoad: false
});