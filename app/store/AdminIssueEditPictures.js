Ext.define('Bim.store.AdminIssueEditPictures', {
    extend: 'Ext.data.Store',
    model: 'Bim.model.Picture',        
    proxy: {
        type: 'rest',
        url : 'api/admin/issue/pictures.json',
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