
Ext.define('Bim.view.PicturesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pictureslist',
    store: 'Pictures',
    title: 'Bilder',
    
    initComponent: function() {
        
        /*
        this.columns = [{
            dataIndex: 'name',
            flex: 1,
            sortable: false,
            hideable: false,
            renderer: function(value, metaData, record) {
                debugger;
                return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
            }
        }];
        */
              
        this.hideHeaders = true;  
        this.columns = [
            { 
                xtype:'templatecolumn',                
                tpl: [
                    '<div class="tn-wrap">',
                        '<div class="tn">',
                            '<img src="{url}&size=100x100" style="width:100px;height:100px" />',
                        '</div>',
                        '<div class="tn-text">',
                            '<b>Name: </b><span>{name}</span>',
                            '<b>Datum: </b><span>{date}</span>',
//                            '<b><a href="{curl}" target="_blank">Kommentar</a></b>',
//                            '<b><a href="{bpurl}" target="_blank">Plan</a></b>',
                        '</div>',
                    '</div>'
                ],                
                //tpl:'<img src="{tnurl}" alt="" style="height:100px" />{ort}',
                flex: 1
            }
        ],
         
        this.callParent();
    }
});