
Ext.define('Bim.view.PictureViewer', {
  extend: 'Ext.window.Window',
  alias: 'widget.pictureviewer',
  requires: [
    'Bim.view.PictureNavigator',
    'Bim.view.PictureDetails',
    'Bim.view.PicturesList'
  ],
  layout: 'border',
  border: false,
  bodyBorder: false,
  closeAction: 'hide',
  initComponent: function() {
    this.items = [
      {
        region: 'north',
        xtype: 'picturenavigator'
      },
      {
        region: 'center',
        //layout: 'fit',
        xtype: 'picturedetails'
      },
      {
        region: 'west',
        xtype: 'pictureslist',
        store: 'AdminPictures',
        autoScroll: true,
        width: 200,
        collapsible: true,
        split: true
      }
    ];
    this.callParent();
  }
});