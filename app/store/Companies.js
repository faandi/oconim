Ext.define('Bim.store.Companies', {
    extend: 'Ext.data.Store',
    model: 'Bim.model.Company',    
    proxy: {
        type: 'rest',
        url : 'api/admin/company.json',
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