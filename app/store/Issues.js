Ext.define('Bim.store.Pictures', {
    extend: 'Ext.data.Store',
    model: 'Bim.model.Picture',        
    proxy: {
        type: 'rest',
        url : 'api/admin/pictures.json'
//        reader: {
//            root: 'results'
//        }
    },
    autoLoad: false
});