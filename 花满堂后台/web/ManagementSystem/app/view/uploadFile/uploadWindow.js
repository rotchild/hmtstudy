(function () {

    Ext.define('ManagementSystem.view.uploadFile.uploadWindow', {
        requires: ['Ext.window.Window', 'ManagementSystem.view.uploadFile.uploadPanel.UploadPanel'],
        extend: 'Ext.window.Window',
        alias: 'widget.uploadWindow',
        id: 'uploadWindow',
        height: 220, width: 420, layout: 'fit', iconCls: 'upload',
        plain: true,
        modal: true,
        title: '上传图片',
        items: [{
            xtype: 'uploadpanel', border: false, addFileBtnText: '选择图片...',
            uploadBtnText: '上传', removeBtnText: '移除所有',
            //downloadTemplateText: '下载模板',
            cancelBtnText: '取消上传',
            file_size_limit: "3072", //MB
            //upload_url: 'api/uploadFile',
            //file_size_limit: "2048",
            //upload_url: '../api/ManagementSystem/uploadImage?fieldtype=' + PublicObject.GuangGaoInfo[0].raw.fieldtype,
            //upload_url: '../api/ManagementSystem/uploadImage?selectUserClass=' + PublicObject.selectUserClass,
            upload_url: '../api/ManagementSystem/uploadImage',
            file_types: '*.bmp;*.jpg;*.png;*.jpeg' //只允许上传excel2007文件  bmp/png/jpeg/jpg/gif
        }]
    });

}).call(this);