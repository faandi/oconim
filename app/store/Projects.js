Ext.define('Bim.store.Projects', {
    extend: 'Ext.data.Store',
    model: 'Bim.model.Project',
    proxy: {
        type: 'rest',
        url : 'api/admin/projects.json',
//        reader: {
//            root: 'results'
//        }
    },
    autoLoad: false
});