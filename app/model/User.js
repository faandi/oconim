
Ext.define('Bim.model.User', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'surname', 'isadmin'],    
    idProperty: 'id'
});