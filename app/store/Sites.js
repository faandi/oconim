Ext.define('Bim.store.Sites', {
    extend: 'Ext.data.Store',
    model: 'Bim.model.Site',
//    filters: {
//        property: 'projectId',
//        value: -1
//    },    
    proxy: {
        type: 'rest',
        url : 'api/admin/sites.json',
//        reader: {
//            root: 'results'
//        }
    },
    autoLoad: false
});