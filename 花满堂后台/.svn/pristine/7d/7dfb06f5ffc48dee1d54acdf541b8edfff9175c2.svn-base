Ext.define('ManagementSystem.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'ManagementSystem.view.CenterPanel',
        'ManagementSystem.view.NorthPanel',
        'ManagementSystem.view.WestPanel'
    ],
    id: 'mainViewPort',
    layout: 'border',
    //style:'background-color:#498fd7',
    items: [
        {
            xtype: 'northPanel',
            region: 'north'
        },
        {
            xtype: 'panel',
            layout: 'border',
            region: 'west',
            border: false,
            width: 200,
            bodyStyle: 'background:#eeeeee;',
            items: [
                {
                    xtype: 'westPanel',
                    border: false,
                    bodyStyle: 'background:#eeeeee;',
                    region: 'center'
                },
                {
                    html: "<div style='width: 200px;background: #eeeeee'>" +
                    "<audio style='width: 0px;height: 0px;' id='TS_CurrentTask' controls><source src='../images/dishids2.mp3' type='audio/mpeg'></audio>" +
                    "<audio style='width: 0px;height: 0px;' id='WM_CurrentTask' controls><source src='../images/dishids2.mp3' type='audio/mpeg'></audio>" +
                    "<audio style='width: 0px;height: 0px;' id='ZS_CurrentTask' controls><source src='../images/dishids2.mp3' type='audio/mpeg'></audio>" +
                    "<audio style='width: 0px;height: 0px;' id='DW_CurrentTask' controls><source src='../images/dishids2.mp3' type='audio/mpeg'></audio>" +
                        "<embed id='TS_CurrentIE' src='../images/dishids2.wav' width='0' height='0' type='audio/mpeg' volume='90' autostart='false' loop='false' style='display:none;'>" +
                    "<audio style='width: 0px;height: 0px;' id='planCountFF' controls><source src='../images/0e59335c80cc8a3255c870c0ee464484.mp3' type='audio/mpeg'></audio>"+
                        "<embed id='planCountIE' src='../images/0e59335c80cc8a3255c870c0ee464484.wav' width='0' height='0' type='audio/mpeg' volume='90' autostart='false' loop='false' style='display:none;'>" +
                        //"<embed hidden='hidden' src='http://sc.111ttt.com/up/mp3/219517/9C6D90AEF1B047033CA2E3F385675995.mp3' width='200' height='25' type='audio/mpeg' volume='50' autostart='false' loop='2'>" +
                        //"<embed hidden='hidden' src='http://sc.111ttt.com/up/mp3/219517/9C6D90AEF1B047033CA2E3F385675995.mp3' width='200' height='25' type='audio/mpeg' volume='50' autostart='false' loop='2'>" +
                    "</div>",
                    border: false,
                    bodyStyle: 'background:#eeeeee;',
                    region: 'south'
                }
            ]
        },
        {
            xtype: 'centerPanel',
            bodyStyle: 'background-color: #eeeeee;background-image: url();',
            region: 'center'
        }
    ]
});