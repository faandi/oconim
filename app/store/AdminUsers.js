Ext.define('Bim.store.AdminUsers', {
    extend: 'Ext.data.Store',
    model: 'Bim.model.AdminUser',    
    proxy: {
        type: 'rest',
        url : 'api/admin/users.json',
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