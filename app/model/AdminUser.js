
Ext.define('Bim.model.AdminUser', {
    extend: 'Ext.data.Model',
    fields: [
      'id', 'username', 'password','name', 'surname', 'email', 'tel'
      // , 'isadmin'
    ],
    idProperty: 'id'
});