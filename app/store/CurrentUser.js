
Ext.define('Bim.store.CurrentUser', {
    extend: 'Ext.data.Store',
    model: 'Bim.model.User',
    proxy: {
        type: 'rest',
        url : 'data/user.json',
        // for testing
        //url : 'data/user-admin.json',
        //url : 'data/user-normal.json',
        reader: {
            root: 'results'
        }
    },
    autoLoad: false
});