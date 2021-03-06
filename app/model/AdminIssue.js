
Ext.define('Bim.model.AdminIssue', {
    extend: 'Ext.data.Model',
    fields: [
      'id', 'subject', 'created', 'modified', 'touser_id',
      'artUndUmfang', 'verursacher', 'bemerkungen', 'kennung', 'emailsent'
    ],
    idProperty: 'id'
});

// 'id', 'name', 'url', 'tags'

// tags:
//Art und Umfang
//Verursacher
//Bemerkungen
//Kennung – Schriftverkehr

// tag:
// key:
// val:
// edit: true|false
