Ext.define('Bim.store.AdminIssues', {
    extend: 'Ext.data.Store',
    model: 'Bim.model.AdminIssue',        
    proxy: {
        type: 'rest',
        url : 'api/admin/issues.json',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        }
    },
    autoLoad: false,
    autoSync: true
});