
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
  showNavigator: true,
  initComponent: function() {
    this.items = [
      {
        region: 'west',
        xtype: 'pictureslist',
        store: 'AdminPictures',
        autoScroll: true,
        width: 200,
        collapsible: true,
        split: true
      },
      {
        region: 'center',
        //layout: 'fit',
        xtype: 'picturedetails'
      }
    ];
    if (this.showNavigator) {
      this.items.push({
        region: 'north',
        xtype: 'picturenavigator'
      });
    }
    this.callParent();
  }
});