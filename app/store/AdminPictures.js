Ext.define('Bim.store.AdminPictures', {
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