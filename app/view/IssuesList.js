
Ext.define('Bim.view.IssuesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.issueslist',
    store: 'AdminIssues',
    title: 'Angelegenheiten',
    
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
                            '<img src="{imgurl}&size=100x100" style="width:100px;height:100px" />',
                        '</div>',
                        '<div class="tn-text">',
                            '<b>Betreff: </b><span>{subject}</span>',
                            '<b>Datum erzeugt: </b><span>{created}</span>',
                            '<b>Datum geändert: </b><span>{created}</span>',
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