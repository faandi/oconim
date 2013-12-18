
Ext.define('Bim.model.Issue', {
    extend: 'Ext.data.Model',
    fields: ['id', 'imgurl', 'subject', 'artUndUmfang', 'verursacher', 'bemerkungen', 'kennung', 'dateCreated'],
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
